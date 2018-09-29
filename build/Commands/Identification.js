"use strict";
/**
 * Identification.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
/**
 * Class Identification
 *
 * Command for request "Software Part Number", "Serial Number", "Asset Number".
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Identification extends Command_1.Command {
    /**
     * Identification constructor.
     */
    constructor() {
        super(0x37);
    }
}
exports.Identification = Identification;
/* End of file Identification.ts */ 
