"use strict";
/**
 * Hold.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
/**
 * Class Hold
 *
 * Command for holding of Bill Validator in Escrow state.
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Hold extends Command_1.Command {
    /**
     * Hold constructor.
     */
    constructor() {
        super(0x38);
    }
}
exports.Hold = Hold;
/* End of file Hold.ts */ 
