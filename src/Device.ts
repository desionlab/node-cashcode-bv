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

  public reset () : Promise<boolean> {
    return new Promise(async (resolve, reject) => {});
  }

  public getInfo () : Promise<DeviceInfo> {
    return new Promise(async (resolve, reject) => {});
  }

  public getBillTable () : Promise<Array<BillInfo>> {
    return new Promise(async (resolve, reject) => {});
  }

  public getBillStatus () : Promise<BillStatus> {
    return new Promise(async (resolve, reject) => {});
  }

  public beginEscrow () : Promise<boolean> {
    return new Promise(async (resolve, reject) => {});
  }

  public billHold () : Promise<boolean> {
    return new Promise(async (resolve, reject) => {});
  }

  public billStack () : Promise<boolean> {
    return new Promise(async (resolve, reject) => {});
  }

  public billReturn () : Promise<boolean> {
    return new Promise(async (resolve, reject) => {});
  }

  public endEscrow () : Promise<boolean> {
    return new Promise(async (resolve, reject) => {});
  }

  /* ----------------------------------------------------------------------- */
  
  public execute (command: Command, params: any = [], timeout: number = 1000) : Promise<any> {
    return new Promise(async (resolve, reject) => {});
  }

  public asyncOnce (event: string | symbol, timeout: number = 1000) : Promise<any> {
    return new Promise(async (resolve, reject) => {});
  }
  
  protected startTimer () : void {}

  /* ----------------------------------------------------------------------- */
  
  protected onTick () : void {}
  
  protected onStatus (status: Buffer) : void {}
  
  protected onSerialPortOpen () : void {}

  protected onSerialPortError (error: Error) : void {}

  protected onSerialPortClose () : void {}

  /* ----------------------------------------------------------------------- */
  
}

/* End of file Device.ts */