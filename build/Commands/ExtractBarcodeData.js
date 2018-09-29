"use strict";
/**
 * ExtractBarcodeData.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
/**
 * Class ExtractBarcodeData
 *
 * Command for retrieving barcode data if barcode coupon is found.
 * If this command is sent when barcode coupon is not found the
 * Bill Validator returns ILLEGAL COMMAND response.
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
class ExtractBarcodeData extends Command_1.Command {
    /**
     * ExtractBarcodeData constructor.
     */
    constructor() {
        super(0x3A);
    }
}
exports.ExtractBarcodeData = ExtractBarcodeData;
/* End of file ExtractBarcodeData.ts */ 
