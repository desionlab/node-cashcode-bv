/**
 * Task.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
/// <reference types="node" />
import { Exception } from './Exception';
/**
 * Method OnTaskDone
 *
 * Determine the event that the command executes with the device.
 *
 * @version 1.0.0
 */
export declare type OnTaskDone = (error?: Exception | null, data?: any | null) => void;
/**
 * Class Task
 *
 * The task of the command execution queue for the device.
 *
 * @version 1.0.0
 */
export declare class Task {
    /**
     * Data for send to the device.
     */
    data: Buffer;
    /**
     * Event of the device command execution.
     */
    done: OnTaskDone;
    /**
     * The maximum time to complete this task.
     */
    timeout: number;
    /**
     * Task constructor.
     *
     * @param command Data for send to the device.
     * @param done Event of the device command execution.
     * @param timeout The maximum time to complete this task.
     */
    constructor(data: Buffer, done: OnTaskDone, timeout?: number);
}
