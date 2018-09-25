/**
 * Device.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
/// <reference types="node" />
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
export declare class Device extends EventEmitter {
    /**
     * Serialport address.
     */
    protected port: string;
    /**
     * Serialport options.
     */
    protected options: SerialPort.OpenOptions;
    /**
     * Debug mode flag.
     */
    protected debug: boolean;
    /**
     * Serialport transport instant.
     */
    protected serial: SerialPort;
    /**
     * CCNet packet parser instant.
     */
    protected parser: Parser;
    /**
     * Main status code.
     */
    protected status: number;
    /**
     * List of pending commands.
     */
    protected queue: Array<Command>;
    /**
     * Device constructor.
     *
     * @param port Serial port address.
     * @param options Serial port open options.
     * @param debug Printing debug info.
     */
    constructor(port: string, options?: SerialPort.OpenOptions, debug?: boolean);
    /**
     * Flag of the established connection to the device.
     */
    readonly isConnect: boolean;
    /**
     * Connect to device.
     */
    connect(): Promise<any>;
    /**
     * Disconnect from device.
     */
    disconnect(): Promise<any>;
    /**
     *
     */
    reset(): Promise<any>;
    /**
     *
     */
    getInfo(): Promise<any>;
    /**
     *
     */
    getBillTable(): Promise<any>;
    /**
     *
     */
    beginEscrow(): Promise<any>;
    /**
     *
     */
    billHold(): Promise<any>;
    /**
     *
     */
    billStack(): Promise<any>;
    /**
     *
     */
    billReturn(): Promise<any>;
    /**
     *
     */
    endEscrow(): Promise<any>;
    /**
     * On serial open event.
     */
    protected onSerialPortOpen(): void;
    /**
     * On serial error event.
     *
     * @param error Serialport error object.
     */
    protected onSerialPortError(error: Error): void;
    /**
     * On serial close event.
     */
    protected onSerialPortClose(): void;
}
