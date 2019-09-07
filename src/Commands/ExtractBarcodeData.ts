/**
 * ExtractBarcodeData.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2019 Desionlab
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
export class ExtractBarcodeData extends Command {
  /**
   * ExtractBarcodeData constructor.
   */
  public constructor() {
    super(0x3a);
  }
}
