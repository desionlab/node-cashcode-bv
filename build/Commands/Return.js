"use strict";
/**
 * Return.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
/**
 * Class Return
 *
 * Command to return a bill in escrow.
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Return extends Command_1.Command {
    /**
     * Return constructor.
     */
    constructor() {
        super(0x36);
    }
}
exports.Return = Return;
/* End of file Return.ts */ 
