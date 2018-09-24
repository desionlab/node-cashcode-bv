/**
 * Device.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
/**
 * List of supported speed modes.
 */
export declare enum DeviceBaudRate {
    DBR9600 = 9600,
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
export declare class Device extends EventEmitter {
    /**
     * Device constructor.
     *
     * @param port Serialport address.
     * @param baudRate Serialport baud rate.
     * @param debug Printing debug info.
     */
    constructor(port: string, baudRate?: DeviceBaudRate, debug?: boolean);
}
