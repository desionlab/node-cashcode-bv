/**
 * ExtractBarcodeData.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
import { Command } from '../Command';
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
export declare class ExtractBarcodeData extends Command {
    /**
     * ExtractBarcodeData constructor.
     */
    constructor();
}
