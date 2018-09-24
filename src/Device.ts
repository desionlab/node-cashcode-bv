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

/**
 * List of supported speed modes.
 */
export enum DeviceBaudRate {
  DBR9600  = 9600,
  DBR19200 = 19200
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

  /**
   * Device constructor.
   * 
   * @param port Serialport address.
   * @param baudRate Serialport baud rate.
   * @param debug Printing debug info.
   */
  constructor (
    port: string, 
    baudRate: DeviceBaudRate = DeviceBaudRate.DBR9600, 
    debug:boolean = false
  ) {
    super();
  }

}

/* End of file Device.ts */