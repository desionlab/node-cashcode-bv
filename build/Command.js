"use strict";
/**
 * Command.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class Command
 *
 * An abstract class of device command logic.
 *
 * @version 1.0.0
 */
class Command {
    constructor() {
    }
    request() {
    }
    /**
     * Processing command response.
     *
     * @param data Data received from the device.
     * @returns { any } The processed data are presented in a convenient form.
     */
    response(data) {
    }
    assemble() {
    }
}
exports.Command = Command;
/* End of file Command.ts */ 
