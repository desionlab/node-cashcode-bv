"use strict";
/**
 * EnableBillTypes.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
/**
 * Class EnableBillTypes
 *
 * Command to set indicates Bill Type enable or disable.
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
class EnableBillTypes extends Command_1.Command {
    /**
     * EnableBillTypes constructor.
     */
    constructor() {
        super(0x34);
    }
}
exports.EnableBillTypes = EnableBillTypes;
/* End of file EnableBillTypes.ts */ 
