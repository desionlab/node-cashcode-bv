/**
 * Device.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */

import * as CCNet from './Const/CCNet';
import { Parser } from './Parser';
import { EventEmitter } from 'events';
import SerialPort from 'serialport';
import { Command } from './Command';

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
  protected queue: Array<Command> = [];

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

    /* Create serialport transport. */
    this.serial = new SerialPort(this.port, this.options, null);
    
    /* On serial open event. */
    this.serial.on('open', () => this.onSerialPortOpen);

    /* On serial error event. */
    this.serial.on('error', (error) => this.onSerialPortError);

    /* On serial close event. */
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
  protected onSerialPortOpen () {}

  /**
   * On serial error event.
   * 
   * @param error Serialport error object.
   */
  protected onSerialPortError (error: Error) {}

  /**
   * On serial close event.
   */
  protected onSerialPortClose () {}

  /* ----------------------------------------------------------------------- */
  
}

/* End of file Device.ts */