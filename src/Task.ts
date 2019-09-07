/**
 * Task.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2019 Desionlab
 * @license   MIT
 */

import { Exception } from './Exception';

/**
 * Method OnTaskDone
 *
 * Determine the event that the command executes with the device.
 *
 * @version 1.0.0
 */
export type OnTaskDone = (error?: Exception | null, data?: any | null) => void;

/**
 * Class Task
 *
 * The task of the command execution queue for the device.
 *
 * @version 1.0.0
 */
export class Task {
  /**
   * Data for send to the device.
   */
  public data: Buffer = null;

  /**
   * Event of the device command execution.
   */
  public done: OnTaskDone = null;

  /**
   * The maximum time to complete this task.
   */
  public timeout: number = 1000;

  /**
   * Task constructor.
   *
   * @param command Data for send to the device.
   * @param done Event of the device command execution.
   * @param timeout The maximum time to complete this task.
   */
  public constructor(data: Buffer, done: OnTaskDone, timeout: number = 1000) {
    this.data = data;
    this.done = done;
    this.timeout = timeout;
  }
}
