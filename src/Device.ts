/**
 * Device.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */

import SerialPort from 'serialport';
import { Command } from './Command';
import * as Commands from './Commands';
import { Task } from './Task';
import { Parser } from './Parser';
import { EventEmitter } from 'events';
import { Exception } from './Exception';
import { getCRC16, Array8Bit } from './Utils';
import { DeviceInfo } from './DeviceInfo';
import { BillInfo } from './BillInfo';
import {
  DeviceStatus,
  DeviceStatusMessage,
  DeviceStatusDescription
} from './Const';

/**
 * Class Device
 * 
 * The object implements the main methods and events for working 
 * with the "CashCode" bill acceptor using the "CCNet" protocol.
 * 
 * @version 1.0.0
 */
export class Device extends EventEmitter {

  /**
   * Serialport address.
   */
  protected port: string = '';

  /**
   * Serialport options.
   */
  protected options: SerialPort.OpenOptions = {
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    autoOpen: false
  };
  
  /**
   * The logger. You can pass electron-log, winston or another logger
   * with the following interface: { info(), debug(), warn(), error() }.
   * Set it to null if you would like to disable a logging feature.
   */
  protected logger: any = null;

  /* ----------------------------------------------------------------------- */
  
  /**
   * Serialport transport instant.
   */
  protected serial: SerialPort = null;

  /**
   * CCNet packet parser instant.
   */
  protected parser: Parser = null;
  
  /* ----------------------------------------------------------------------- */
  
  /**
   * Device information.
   */
  protected info: DeviceInfo = null;

  /**
   * List of supported bills.
   */
  protected billTable: Array<BillInfo> = [];

  /**
   * Status code.
   */
  protected status: DeviceStatus = null;

  /**
   * A flag indicating the current command execution.
   */
  protected busy: boolean = false;

  /* ----------------------------------------------------------------------- */
  
  /**
   * List of pending commands.
   */
  protected queue: Array<Task> = [];

  /**
   * 
   */
  protected timerMs: number = 100;

  /**
   * Operating timer.
   */
  protected timerInterval: NodeJS.Timer = null;

  /* ----------------------------------------------------------------------- */
  
  /**
   * Device constructor.
   * 
   * @param port Serial port address.
   * @param options Serial port open options.
   * @param logger Logger instant.
   */
  public constructor (port: string, options?: SerialPort.OpenOptions, logger?: any) {
    super();
    
    /* --------------------------------------------------------------------- */

    /* Set serialport address. */
    this.port = port;
    
    /* Set serialport options. */
    if (options) {
      this.options = Object.assign(this.options, options);
    }

    /* Set logger instant. */
    if (logger) {
      this.logger = logger;
    }
    
    /* --------------------------------------------------------------------- */

    /* Bind operating timer event. */
    this.on('tick', () => {
      setImmediate(() => {
        this.onTick();
      });
    });

    /*  */
    this.on(String(DeviceStatus.UNIT_DISABLED), () => {
      setImmediate(() => {
        this.timerMs = 500;
        this.startTimer();
      });
    });

    /*  */
    this.on(String(DeviceStatus.ESCROW_POSITION), () => {
      setImmediate(() => {
        this.timerMs = 100;
        this.startTimer();
      });
    });

    /* --------------------------------------------------------------------- */

    /* Create serialport transport. */
    this.serial = new SerialPort(this.port, this.options, null);
    
    /* Bind serial open event. */
    this.serial.on('open', () => { this.onSerialPortOpen(); });

    /* Bind serial error event. */
    this.serial.on('error', (error) => { this.onSerialPortError(error); });

    /* Bind serial close event. */
    this.serial.on('close', () => { this.onSerialPortClose(); });

    /* Set CCNet packet parser. */
    this.parser = this.serial.pipe(new Parser());
    
    /* --------------------------------------------------------------------- */

  }

  /* ----------------------------------------------------------------------- */
  
  /**
   * Flag of the established connection to the device.
   */
  get isConnect () {
    return (this.serial.isOpen);
  }
  
  /**
   * A flag indicating the current command execution.
   */
  get isBusy () {
    return this.busy;
  }

  /* ----------------------------------------------------------------------- */
  
  /**
   * Connect to device.
   */
  public async connect () : Promise<boolean> {
    try {
      /* Open serial port. */
      await this.open();

      /* Reset device. */
      await this.reset();

      /* Wait device initialize. */
      await this.asyncOnce(String(DeviceStatus.INITIALIZE), 2500);
      
      /* Get main info of the device. */
      await this.getInfo();

      /* Get list of supported bills. */
      await this.getBillTable();

      /*  */
      await this.beginEscrow();

      /*  */
      await this.asyncOnce(String(DeviceStatus.IDLING), 2500);

      /*  */
      let status = await this.getStatus();

      /*  */
      await this.endEscrow();

      /*  */
      for(let i = 0; i < this.billTable.length; i++) {
        this.billTable[i].enabled = status.enabled[i];
        this.billTable[i].security = status.security[i];
      }

      /* Fire ready connect event. */
      this.emit('connect');
      
      /*  */
      return true;
    } catch (error) {
      /* Disconnect from device. */
      await this.disconnect();
      
      /*  */
      throw error;
    }
  }

  /**
   * Disconnect from device.
   */
  public async disconnect () : Promise<boolean> {
    try {
      await this.close();
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Reset the device to its original state.
   */
  public async reset () : Promise<boolean> {
    try {
      await this.execute((new Commands.Reset()));
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get main info of the device.
   */
  public async getInfo () : Promise<DeviceInfo> {
    try {
      if (!this.info) {
        this.info = new DeviceInfo(
          await this.execute((new Commands.Identification())),
          await this.execute((new Commands.GetCRC32OfTheCode()))
        );
      }
      
      return this.info;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get list of supported bills.
   */
  public async getBillTable () : Promise<Array<BillInfo>> {
    try {
      if (!this.billTable.length) {
        let billTable = await this.execute((new Commands.GetBillTable()));

        for (var i = 0; i < 24; i++) {
          let section = billTable.slice(i * 5, (i * 5 + 5));
          this.billTable.push((new BillInfo(section)));
        }
      }

      return this.billTable;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 
   */
  public async getStatus () : Promise<any> {
    try {
      let status = await this.execute((new Commands.GetStatus()));

      let enabled = Array8Bit
      .fromBuffer(status.slice(0, 3))
      .toArray()
      .reverse();

      let security = Array8Bit
      .fromBuffer(status.slice(3, 6))
      .toArray()
      .reverse();

      return {
        enabled,
        security
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * 
   */
  public async beginEscrow () : Promise<boolean> {
    /*  */
    let securityList: Array<boolean> = [];
    let enabledList: Array<boolean> = [];
    let escrowList: Array<boolean> = [];

    /*  */
    this.billTable.forEach(element => {
      securityList.push(element.security);
      enabledList.push(element.enabled);
      escrowList.push(element.escrow);
    });

    try {
      /*  */
      //await this.execute(
      //  (new Commands.SetSecurity()),
      //  Array8Bit.fromArray(securityList).toBuffer()
      //);
      
      /*  */
      await this.execute(
        (new Commands.EnableBillTypes()),
        Buffer.concat([
          Array8Bit.fromArray(enabledList.reverse()).toBuffer(),
          Array8Bit.fromArray(escrowList.reverse()).toBuffer()
        ])
      );

      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 
   */
  public async billHold () : Promise<boolean> {
    try {
      await this.execute((new Commands.Hold()));
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 
   */
  public async billStack () : Promise<boolean> {
    try {
      await this.execute((new Commands.Stack()));
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 
   */
  public async billReturn () : Promise<boolean> {
    try {
      await this.execute((new Commands.Return()));
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 
   */
  public async endEscrow () : Promise<any> {
    return await this.execute(
      (new Commands.EnableBillTypes()),
      [0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
    );
  }

  /* ----------------------------------------------------------------------- */
  
  /**
   * Execute the specified command.
   * 
   * @param command Target command.
   * @param params Execute parameters.
   * @param timeout The maximum time to complete this action.
   */
  public execute (command: Command, params: any = [], timeout: number = 1000) : Promise<any> {
    return new Promise((resolve, reject) => {
      let task = new Task(command.request(params), (error, data) => {
        if (error) {
          reject(error);
        }

        resolve(command.response(data));
      }, timeout);

      this.queue.push(task);
    });
  }

  /**
   * Synchronization of internal events with the execution queue.
   * 
   * @param event Internal event name.
   * @param timeout Maximum waiting time for an internal event.
   */
  public asyncOnce (event: string | symbol, timeout: number = 1000) : Promise<any> {
    return new Promise((resolve, reject) => {
      let timeoutCounter: number = 0;

      let timeoutHandler = () => {
        setImmediate(() => {
          timeoutCounter += this.timerMs;

          if (timeoutCounter >= timeout) {
            this.removeListener(event, handler);
            this.removeListener('tick', timeoutHandler);
            reject(new Exception(10, 'Request timeout.'));
          }
        });
      };

      let handler = () => {
        if (timeout) {
          this.removeListener('tick', timeoutHandler);
        }

        this.removeListener(event, handler);

        resolve(true);
      };
      
      this.once(event, handler);

      if (timeout) {
        this.on('tick', timeoutHandler);
      }
    });
  }

  /* ----------------------------------------------------------------------- */

  /**
   * Open serialport.
   */
  protected open () : Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.serial.isOpen) {
        resolve(true);
      } else {
        this.serial.open((error) => {
          if (error) {
            reject(error);
          }
  
          resolve(true);
        });
      }
    });
  }
  
  /**
   * Close serialport.
   */
  protected close () : Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.serial.isOpen) {
        this.serial.close((error) => {
          if (error) {
            reject(error);
          }
  
          resolve(true);
        });
      } else {
        resolve(true);
      }
    });
  }

  /**
   * Start / Restart operating timer.
   */
  protected startTimer () : void {
    /* Clear operating timer. */
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    /* Start operating timer. */
    this.timerInterval = setInterval(() => {
      this.emit('tick');
    }, this.timerMs);
  }

  /* ----------------------------------------------------------------------- */
  
  /**
   * On serial open event.
   */
  protected onSerialPortOpen () {
    /* Start operating timer. */
    this.startTimer();
  }

  /**
   * On serial error event.
   * 
   * @param error Serialport error object.
   */
  protected onSerialPortError (error: Error) {
    /* Stop operating timer. */
    clearInterval(this.timerInterval);
  }

  /**
   * On serial close event.
   */
  protected onSerialPortClose () {
    /* Stop operating timer. */
    clearInterval(this.timerInterval);
  }
  
  /* ----------------------------------------------------------------------- */
  
  /**
   * All status events handler.
   * 
   * @param status Current devise status.
   */
  protected onStatus (status: Buffer) {
    /* New status container. */
    let newStatus: number = null;

    /* Determine the new status. */
    if (status.length >= 2) {
      switch (parseInt(status[0].toString(10))) {
        case DeviceStatus.DEVICE_BUSY:
        case DeviceStatus.ESCROW_POSITION:
        case DeviceStatus.BILL_STACKED:
        case DeviceStatus.BILL_RETURNED:
          newStatus = parseInt(status[0].toString(10));
        break;
        default:
          newStatus = parseInt(status[0].toString(10)+status[1].toString(10));
        break;
      }
    } else {
      newStatus = parseInt(status[0].toString(10));
    }

    /* Check new status. */
    if (newStatus) {
      if (newStatus !== this.status) {
        /* Set new status. */
        this.status = newStatus;

        /* Call a shared event for all device states. */
        this.emit(
          'status',
          this.status,
          DeviceStatusMessage.get(this.status),
          DeviceStatusDescription.get(this.status)
        );
        
        /* Event call by type and purpose. */
        switch (newStatus) {
          case DeviceStatus.DEVICE_BUSY:
            this.emit(
              String(this.status),
              parseInt(status[1].toString(10))
            );
          break;
          case DeviceStatus.ESCROW_POSITION:
          case DeviceStatus.BILL_STACKED:
          case DeviceStatus.BILL_RETURNED:
            this.emit(
              String(this.status),
              this.billTable[parseInt(status[1].toString(10))]
            );
          break;
          default:
            this.emit(
              String(this.status),
              DeviceStatusMessage.get(this.status),
              DeviceStatusDescription.get(this.status)
            );
          break;
        }
      }
    } else {
      /* Status not recognized. */
    }
  }

  /**
   * Operating timer event.
   */
  protected onTick () {
    /* Check busy flag. */
    if (!this.busy) {
      let task = this.queue.shift();

      /* Check next task. */
      if (typeof task !== 'undefined' && task instanceof Task) {
        /* Update flag. */
        this.busy = true;

        let timeoutCounter: number = 0;

        /* Timeout timer handler. */
        let timeoutHandler = () => {
          setImmediate(() => {
            timeoutCounter += this.timerMs;

            if (timeoutCounter >= task.timeout) {
              this.busy = false;
              this.removeListener('tick', timeoutHandler);
              task.done(new Exception(10, 'Request timeout.'), null);
            }
          });
        };

        /* Receive packet handler. */
        let handler = async (response: Buffer) => {
          this.removeListener('tick', timeoutHandler);
            
          /* Unbind event. */
          this.parser.removeListener('data', handler);
          
          /* Write debug info. */
          if (this.logger) {
            this.logger.debug('Receive packet:', response);
          }

          /* Check CRC */
          let ln = response.length;
          let check = response.slice(ln-2, ln);
          let slice = response.slice(0, ln-2);

          /* Check response CRC. */
          if (check.toString() !== (getCRC16(slice)).toString()) {
            /* Send NAK. */
            await this.serial.write((new Commands.Nak()).request());

            /* Update flag. */
            this.busy = false;

            /* Send event. */
            task.done(new Exception(11, 'Wrong response data hash.'), null);
          }

          /* Get data from packet. */
          let data = response.slice(3, ln-2);
          
          /* Check response type. */
          if (data.length == 1 && data[0] == 0x00) {
            /* Response receive as ACK. */
          } else if (data.length == 1 && data[0] == 0xFF) {
            /* Response receive as NAK. */
            
            /* Update flag. */
            this.busy = false;
            
            /* Send event. */
            task.done(new Exception(11, 'Wrong request data hash.'), null);
          } else {
            /* Send ACK. */
            await this.serial.write((new Commands.Ack()).request());
          }
          
          /* Update flag. */
          this.busy = false;

          /* Send event. */
          task.done(null, data);
        };

        /* Bind event. */
        this.parser.once('data', handler);

        /* Write debug info. */
        if (this.logger) {
          this.logger.debug('Send packet:', task.data);
        }

        /* Send packet. */
        this.serial.write(task.data);

        /* Bind timeout handler. */
        if (task.timeout) {
          this.on('tick', timeoutHandler);
        }
      } else {
        /* Add poll task to queue. */
        this.queue.push(new Task((new Commands.Poll()).request(), (error, data) => {
          if (error) {
            throw error;
          }
  
          this.onStatus(data);
        }, 1000));
      }
    }
  }

}

/* End of file Device.ts */