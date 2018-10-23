/**
 * Device.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
/// <reference types="node" />
import SerialPort from 'serialport';
import { Command } from './Command';
import { Task } from './Task';
import { Parser } from './Parser';
import { EventEmitter } from 'events';
import { DeviceInfo } from './DeviceInfo';
import { BillInfo } from './BillInfo';
import { DeviceStatus } from './Const';
/**
 * Bills status flags sets.
 */
export interface BillStatus {
    /**
     * The list of flags allowed to accept bills.
     */
    enabled: Array<boolean>;
    /**
     * List of security flags for bills.
     */
    security: Array<boolean>;
    /**
     * List of escrow flags for bills.
     */
    escrow?: Array<boolean>;
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
     * Serialport address.
     */
    port: string;
    /**
     * Serialport options.
     */
    options: SerialPort.OpenOptions;
    /**
     * Serialport transport instant.
     */
    protected serial: SerialPort;
    /**
     * CCNet packet parser instant.
     */
    protected parser: Parser;
    /**
     * The logger. You can pass electron-log, winston or another logger
     * with the following interface: { info(), debug(), warn(), error() }.
     * Set it to null if you would like to disable a logging feature.
     */
    logger: any;
    /**
     * Flag allowing to log received, sent data packets.
     */
    debugPackets: boolean;
    /**
     * The current status of the device.
     */
    protected _status: DeviceStatus;
    /**
     * Getter for a current status of the device.
     */
    readonly status: DeviceStatus;
    /**
     * Device main information.
     */
    protected _info: DeviceInfo;
    /**
     * Getter for a device main information.
     */
    readonly info: DeviceInfo;
    /**
     * List of supported bills.
     */
    protected _billTable: Array<BillInfo>;
    /**
     * Getter for a list of supported bills.
     */
    readonly billTable: Array<BillInfo>;
    /**
     * Bills status flags sets.
     */
    protected _billStatus: BillStatus;
    /**
     * Getter a bills status flags sets.
     */
    /**
    * Setter a bills status flags sets.
    */
    billStatus: BillStatus;
    /**
     * A flag indicating the current command execution.
     */
    protected busy: boolean;
    /**
     * List of pending commands.
     */
    protected queue: Array<Task>;
    /**
     * Operating timer interval.
     */
    protected timerMs: number;
    /**
     * Operating timer.
     */
    protected timerInterval: NodeJS.Timer;
    /**
     * Device constructor.
     *
     * @param port Serial port address.
     * @param options Serial port open options.
     * @param logger Logger instant.
     * @param debugPackets Flag allowing to log received, sent data packets.
     */
    constructor(port: string, options?: SerialPort.OpenOptions, logger?: any, debugPackets?: boolean);
    open(): Promise<boolean>;
    connect(): Promise<boolean>;
    disconnect(): Promise<boolean>;
    close(): Promise<boolean>;
    reset(): Promise<boolean>;
    getInfo(): Promise<DeviceInfo>;
    getBillTable(): Promise<Array<BillInfo>>;
    getBillStatus(): Promise<BillStatus>;
    beginEscrow(): Promise<boolean>;
    billHold(): Promise<boolean>;
    billStack(): Promise<boolean>;
    billReturn(): Promise<boolean>;
    endEscrow(): Promise<boolean>;
    execute(command: Command, params?: any, timeout?: number): Promise<any>;
    asyncOnce(event: string | symbol, timeout?: number): Promise<any>;
    protected startTimer(): void;
    protected onTick(): void;
    protected onStatus(status: Buffer): void;
    protected onSerialPortOpen(): void;
    protected onSerialPortError(error: Error): void;
    protected onSerialPortClose(): void;
}
