"use strict";
/**
 * GetBillTable.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
/**
 * Class GetBillTable
 *
 * Command for get bill types description.
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
class GetBillTable extends Command_1.Command {
    /**
     * GetBillTable constructor.
     */
    constructor() {
        super(0x41);
    }
}
exports.GetBillTable = GetBillTable;
/* End of file GetBillTable.ts */ 
