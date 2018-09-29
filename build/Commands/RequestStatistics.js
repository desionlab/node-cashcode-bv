"use strict";
/**
 * RequestStatistics.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
/**
 * Class RequestStatistics
 *
 * Command for retrieving full information about acceptance performance.
 *
 * @description CCNet Document 3
 * @version 1.0.0
 */
class RequestStatistics extends Command_1.Command {
    /**
     * RequestStatistics constructor.
     */
    constructor() {
        super(0x60);
    }
}
exports.RequestStatistics = RequestStatistics;
/* End of file RequestStatistics.ts */ 
