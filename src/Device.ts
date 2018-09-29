/**
 * Device.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */

import SerialPort from 'serialport';
import * as CCNet from './Const/CCNet';
import * as Commands from './Commands';
import { Task } from './Task';
import { Parser } from './Parser';
import { EventEmitter } from 'events';

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
   * Debug mode flag.
   */
  protected debug: boolean = false;

  /**
   * Serialport transport instant.
   */
  protected serial: SerialPort = null;

  /**
   * CCNet packet parser instant.
   */
  protected parser: Parser = null;
  
  /**
   * Main status code.
   */
  protected status: number = null;

  /**
   * List of pending commands.
   */
  protected queue: Array<Task> = [];

  /**
   * Operating timer.
   */
  protected tickTakInterval: NodeJS.Timer = null;

  /* ----------------------------------------------------------------------- */
  
  /**
   * Device constructor.
   * 
   * @param port Serial port address.
   * @param options Serial port open options.
   * @param debug Printing debug info.
   */
  public constructor (port: string, options?: SerialPort.OpenOptions, debug?: boolean) {
    super();
    
    /* --------------------------------------------------------------------- */

    /* Set serialport address. */
    this.port = port;
    
    /* Set serialport options. */
    if (options) {
      this.options = Object.assign(this.options, options);
    }

    /* Set debug flag. */
    if (debug) {
      this.debug = debug;
    }
    
    /* --------------------------------------------------------------------- */

    /* Bind operating timer event. */
    this.on('nextTick', () => this.onNextTick);

    /* --------------------------------------------------------------------- */

    /* Create serialport transport. */
    this.serial = new SerialPort(this.port, this.options, null);
    
    /* Bind serial open event. */
    this.serial.on('open', () => this.onSerialPortOpen);

    /* Bind serial error event. */
    this.serial.on('error', (error) => this.onSerialPortError);

    /* Bind serial close event. */
    this.serial.on('close', () => this.onSerialPortClose);

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
  
  /* ----------------------------------------------------------------------- */
  
  /**
   * Connect to device.
   */
  public async connect () : Promise<any> {}

  /**
   * Disconnect from device.
   */
  public async disconnect () : Promise<any> {}

  /**
   * 
   */
  public async reset () : Promise<any> {}

  /**
   * 
   */
  public async getInfo () : Promise<any> {}

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
   * On serial open event.
   */
  protected onSerialPortOpen () {
    /* Start operating timer. */
    this.tickTakInterval = setInterval(() => {
      this.emit('nextTick');
    }, 100);
  }

  /**
   * On serial error event.
   * 
   * @param error Serialport error object.
   */
  protected onSerialPortError (error: Error) {
    /* Stop operating timer. */
    clearInterval(this.tickTakInterval);
  }

  /**
   * On serial close event.
   */
  protected onSerialPortClose () {
    /* Stop operating timer. */
    clearInterval(this.tickTakInterval);
  }

  /**
   * Operating timer event.
   */
  protected onNextTick () {}

  /**
   * All status events handler.
   * 
   * @param status Current devise status.
   */
  protected onStatus (status: Buffer) {}

  /* ----------------------------------------------------------------------- */
  
}

/* End of file Device.ts */