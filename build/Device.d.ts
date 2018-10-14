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
import { DeviceStatus } from './Const';
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
     * The logger. You can pass electron-log, winston or another logger
     * with the following interface: { info(), debug(), warn(), error() }.
     * Set it to null if you would like to disable a logging feature.
     */
    protected logger: any;
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
    protected status: DeviceStatus;
    /**
     * A flag indicating the current command execution.
     */
    protected busy: boolean;
    /**
     * List of pending commands.
     */
    protected queue: Array<Task>;
    /**
     *
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
     */
    constructor(port: string, options?: SerialPort.OpenOptions, logger?: any);
    /**
     * Flag of the established connection to the device.
     */
    readonly isConnect: boolean;
    /**
     * A flag indicating the current command execution.
     */
    readonly isBusy: boolean;
    /**
     * Connect to device.
     */
    connect(): Promise<any>;
    /**
     * Disconnect from device.
     */
    disconnect(): Promise<any>;
    /**
     * Reset the device to its original state.
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
     * Open serialport.
     */
    protected open(): Promise<any>;
    /**
     * Close serialport.
     */
    protected close(): Promise<any>;
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
    /**
     * All status events handler.
     *
     * @param status Current devise status.
     */
    protected onStatus(status: Buffer): void;
    /**
     * Operating timer event.
     */
    protected onTick(): void;
    /**
     * Execute the specified command.
     *
     * @param command Target command.
     * @param params Execute parameters.
     * @param timeout The maximum time to complete this action.
     */
    execute(command: Command, params?: any, timeout?: number): Promise<any>;
    /**
     * Synchronization of internal events with the execution queue.
     *
     * @param event Internal event name.
     * @param timeout Maximum waiting time for an internal event.
     */
    asyncOnce(event: string | symbol, timeout?: number): Promise<any>;
}
