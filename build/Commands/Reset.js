"use strict";
/**
 * Reset.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
/**
 * Class Reset
 *
 * Command for Bill Validator to self-reset.
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Reset extends Command_1.Command {
    /**
     * Reset constructor.
     */
    constructor() {
        super(0x30);
    }
}
exports.Reset = Reset;
/* End of file Reset.ts */ 
