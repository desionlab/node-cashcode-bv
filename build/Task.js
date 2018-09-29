"use strict";
/**
 * Task.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class Task
 *
 * The task of the command execution queue for the device.
 *
 * @version 1.0.0
 */
class Task {
    /**
     * Task constructor.
     *
     * @param command Data for send to the device.
     * @param done Event of the device command execution.
     */
    constructor(data, done) {
        /**
         * Data for send to the device.
         */
        this.data = null;
        /**
         * Event of the device command execution.
         */
        this.done = null;
        this.data = data;
        this.done = done;
    }
}
exports.Task = Task;
/* End of file Task.ts */ 
