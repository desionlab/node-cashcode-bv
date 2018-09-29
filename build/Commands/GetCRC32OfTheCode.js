"use strict";
/**
 * GetCRC32OfTheCode.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
/**
 * Class GetCRC32OfTheCode
 *
 * Command for request Bill Validator firmware CRC32.
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
class GetCRC32OfTheCode extends Command_1.Command {
    /**
     * GetCRC32OfTheCode constructor.
     */
    constructor() {
        super(0x51);
    }
}
exports.GetCRC32OfTheCode = GetCRC32OfTheCode;
/* End of file GetCRC32OfTheCode.ts */ 
