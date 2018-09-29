"use strict";
/**
 * GetStatus.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
/**
 * Class GetStatus
 *
 * Command for request Bill Validator set-up status.
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
class GetStatus extends Command_1.Command {
    /**
     * GetStatus constructor.
     */
    constructor() {
        super(0x31);
    }
}
exports.GetStatus = GetStatus;
/* End of file GetStatus.ts */ 
