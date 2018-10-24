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
 * Bills status flags sets.
 */
export interface BillStatus {
  /**
   * The list of flags allowed to accept bills.
   */
  enabled: Array<boolean>,

  /**
   * List of security flags for bills.
   */
  security: Array<boolean>,

  /**
   * List of escrow flags for bills.
   */
  escrow?: Array<boolean>
}

/**
 * Class Device
 * 
 * The object implements the main methods and events for working 
 * with the "CashCode" bill acceptor using the "CCNet" protocol.
 * 
 * @version 1.0.0
 */
export class Device extends EventEmitter {

  /* ----------------------------------------------------------------------- */
  
  /**
   * Serialport address.
   */
  public port: string = '';

  /**
   * Serialport options.
   */
  public options: SerialPort.OpenOptions = {
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    autoOpen: false
  };
  
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
   * The logger. You can pass electron-log, winston or another logger
   * with the following interface: { info(), debug(), warn(), error() }.
   * Set it to null if you would like to disable a logging feature.
   */
  public logger: any = null;

  /**
   * Flag allowing to log received, sent data packets.
   */
  public debugPackets: boolean = false;

  /* ----------------------------------------------------------------------- */
  
  /**
   * The current status of the device.
   */
  protected _status: DeviceStatus = null;

  /**
   * Getter for a current status of the device.
   */
  get status () : DeviceStatus {
    return this._status;
  }

  /**
   * Device main information.
   */
  protected _info: DeviceInfo = null;

  /**
   * Getter for a device main information.
   */
  get info () : DeviceInfo {
    return this._info;
  }

  /**
   * List of supported bills.
   */
  protected _billTable: Array<BillInfo> = [];

  /**
   * Getter for a list of supported bills.
   */
  get billTable () : Array<BillInfo> {
    return this._billTable;
  }
  
  /**
   * Bills status flags sets.
   */
  protected _billStatus: BillStatus = {
    /**
     * The list of flags allowed to accept bills.
     */
    enabled: [true, true, true, true, true, true, true, true, true,
      true, true, true, true, true, true, true, true, true, true, true,
      true, true, true, true],
    
    /**
     * List of security flags for bills.
     */
    security: [false, false, false, false, false, false, false, false,
      false, false, false, false, false, false, false, false, false, false,
      false, false, false, false, false, false],
    
    /**
     * List of escrow flags for bills.
     */
    escrow: [true, true, true, true, true, true, true, true, true,
      true, true, true, true, true, true, true, true, true, true, true,
      true, true, true, true]
  }

  /**
   * Getter a bills status flags sets.
   */
  get billStatus () : BillStatus {
    return this._billStatus;
  }

  /**
   * Setter a bills status flags sets.
   */
  set billStatus (value: BillStatus) {
    this._billStatus = value;
  }

  /* ----------------------------------------------------------------------- */
  
  /**
   * A flag indicating the current command execution.
   */
  protected busy: boolean = false;
  
  /**
   * List of pending commands.
   */
  protected queue: Array<Task> = [];

  /**
   * Operating timer interval.
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
   * @param debugPackets Flag allowing to log received, sent data packets.
   */
  public constructor (
    port: string, options?: SerialPort.OpenOptions,
    logger?: any, debugPackets?: boolean
  ) {
    super();
    
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
    
    /* Set packets log flag. */
    if (debugPackets) {
      this.debugPackets = debugPackets;
    }
  }
  
  /* ----------------------------------------------------------------------- */
  
  public open () : Promise<boolean> {
    return new Promise(async (resolve, reject) => {});
  }

  public connect () : Promise<boolean> {
    return new Promise(async (resolve, reject) => {});
  }
  
  public disconnect () : Promise<boolean> {
    return new Promise(async (resolve, reject) => {});
  }
  
  public close () : Promise<boolean> {
    return new Promise(async (resolve, reject) => {});
  }

  /* ----------------------------------------------------------------------- */
  
  /**
   * 
   */
  public begin () : Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
  
  /**
   * 
   */
  public hold () : Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.execute((new Commands.Hold()));
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
  
  /**
   * 
   */
  public stack () : Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.execute((new Commands.Stack()));
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
  
  /**
   * 
   */
  public return () : Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.execute((new Commands.Return()));
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 
   */
  public end () : Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.execute(
          (new Commands.EnableBillTypes()),
          [0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
        );
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
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
    return new Promise(async (resolve, reject) => {
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
    return new Promise(async (resolve, reject) => {
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

  /**
   * Stop operating timer.
   */
  protected stopTimer () : void {
    clearInterval(this.timerInterval);
  }

  /* ----------------------------------------------------------------------- */
  
  /**
   * Operating timer event.
   */
  protected onTick () : void {
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
          if (this.logger && this.debugPackets) {
            this.logger.debug('RP:', response);
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
        if (this.logger && this.debugPackets) {
          this.logger.debug('SP:', task.data);
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
  
  /**
   * All status events handler.
   * 
   * @param status Current devise status.
   */
  protected onStatus (status: Buffer) : void {
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
      if (newStatus !== this._status) {
        /* Set new status. */
        this._status = newStatus;

        /* Call a shared event for all device states. */
        this.emit(
          'status',
          this._status,
          DeviceStatusMessage.get(this._status),
          DeviceStatusDescription.get(this._status)
        );
        
        /* Event call by type and purpose. */
        switch (newStatus) {
          case DeviceStatus.DEVICE_BUSY:
            this.emit(
              String(this._status),
              parseInt(status[1].toString(10))
            );
          break;
          case DeviceStatus.ESCROW_POSITION:
          case DeviceStatus.BILL_STACKED:
          case DeviceStatus.BILL_RETURNED:
            this.emit(
              String(this._status),
              this.billTable[parseInt(status[1].toString(10))]
            );
          break;
          default:
            this.emit(
              String(this._status),
              DeviceStatusMessage.get(this._status),
              DeviceStatusDescription.get(this._status)
            );
          break;
        }
      }
    } else {
      /* Status not recognized. */
    }
  }
  
  /**
   * On serial open event.
   */
  protected onSerialPortOpen () : void {
    /* Start operating timer. */
    this.startTimer();
  }

  /**
   * On serial error event.
   * 
   * @param error Serialport error object.
   */
  protected onSerialPortError (error: Error) : void {
    /* Stop operating timer. */
    this.stopTimer();
  }

  /**
   * On serial close event.
   */
  protected onSerialPortClose () : void {
    /* Stop operating timer. */
    this.stopTimer();
  }

  /* ----------------------------------------------------------------------- */
  
}

/* End of file Device.ts */