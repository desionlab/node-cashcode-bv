"use strict";
/**
 * Stack.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
/**
 * Class Stack
 *
 * Command for sent by Controller to send a bill in escrow to the drop cassette.
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Stack extends Command_1.Command {
    /**
     * Stack constructor.
     */
    constructor() {
        super(0x35);
    }
}
exports.Stack = Stack;
/* End of file Stack.ts */ 
