"use strict";
/**
 * SetBarcodeParameters.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
/**
 * Class SetBarcodeParameters
 *
 * Command for settings the barcode format and number of characters.
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
class SetBarcodeParameters extends Command_1.Command {
    /**
     * SetBarcodeParameters constructor.
     */
    constructor() {
        super(0x39);
    }
}
exports.SetBarcodeParameters = SetBarcodeParameters;
/* End of file SetBarcodeParameters.ts */ 
