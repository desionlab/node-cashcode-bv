"use strict";
/**
 * Poll.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
/**
 * Class Poll
 *
 * Command for request Bill Validator activity status.
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Poll extends Command_1.Command {
    /**
     * Poll constructor.
     */
    constructor() {
        super(0x33);
    }
}
exports.Poll = Poll;
/* End of file Poll.ts */ 
