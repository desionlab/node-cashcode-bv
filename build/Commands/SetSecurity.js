"use strict";
/**
 * SetSecurity.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
/**
 * Class SetSecurity
 *
 * Command to sets Bill Validator security mode.
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
class SetSecurity extends Command_1.Command {
    /**
     * SetSecurity constructor.
     */
    constructor() {
        super(0x32);
    }
}
exports.SetSecurity = SetSecurity;
/* End of file SetSecurity.ts */ 
