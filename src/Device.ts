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
import { getCRC16 } from './Utils';
import { DeviceInfo } from './DeviceInfo';
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
  public async connect () : Promise<any> {
    try {
      /*  */
      await this.open();

      /*  */
      await this.reset();

      /*  */
      await this.asyncOnce(String(DeviceStatus.INITIALIZE), 1000);
      
      /*  */
      await this.getInfo();

      /*  */
      await this.execute((new Commands.GetBillTable()));

      /*  */
      this.emit('connect');
      
      /*  */
      return true;
    } catch (error) {
      /*  */
      await this.disconnect();
      
      /*  */
      throw error;
    }
  }

  /**
   * Disconnect from device.
   */
  public async disconnect () : Promise<any> {
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
  public async reset () : Promise<any> {
    return await this.execute((new Commands.Reset()));
  }

  /**
   * 
   */
  public async getInfo () : Promise<DeviceInfo> {
    if (!this.info) {
      this.info = new DeviceInfo(
        await this.execute((new Commands.Identification())),
        await this.execute((new Commands.GetCRC32OfTheCode()))
      );
    }

    return this.info;
  }

  /**
   * 
   */
  public async getBillTable () : Promise<any> {}

  /**
   * 
   */
  public async beginEscrow () : Promise<any> {}

  /**
   * 
   */
  public async billHold () : Promise<any> {}

  /**
   * 
   */
  public async billStack () : Promise<any> {}

  /**
   * 
   */
  public async billReturn () : Promise<any> {}

  /**
   * 
   */
  public async endEscrow () : Promise<any> {}

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
  protected open () : Promise<any> {
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
  protected close () : Promise<any> {
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

  /* ----------------------------------------------------------------------- */
  
  /**
   * On serial open event.
   */
  protected onSerialPortOpen () {
    /* Start operating timer. */
    this.timerInterval = setInterval(() => {
      this.emit('tick');
    }, this.timerMs);
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

    /*  */
    if (newStatus) {
      if (newStatus !== this.status) {
        /*  */
        this.status = newStatus;

        /*  */
        this.emit(
          'status',
          this.status,
          DeviceStatusMessage.get(this.status),
          DeviceStatusDescription.get(this.status)
        );

        /*  */
        switch (newStatus) {
          case DeviceStatus.DEVICE_BUSY:

          break;
          case DeviceStatus.ESCROW_POSITION:
          case DeviceStatus.BILL_STACKED:
          case DeviceStatus.BILL_RETURNED:
            
          break;
          default:
            /*  */
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