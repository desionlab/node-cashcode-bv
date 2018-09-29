"use strict";
/**
 * Ack.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
/**
 * Class Ack
 *
 * Command to confirm a response correctly received.
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Ack extends Command_1.Command {
    /**
     * Ack constructor.
     */
    constructor() {
        super(0x00);
    }
}
exports.Ack = Ack;
/* End of file Ack.ts */ 
