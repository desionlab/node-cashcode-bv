/**
 * ExtractBarcodeData.js
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2018 Desionlab
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

const CCNet = require('./../Constants');
const Command = require('./../Command');

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
class ExtractBarcodeData extends Command {

  /**
   * ExtractBarcodeData constructor
   * 
   * @param {Object} device 
   */
  constructor (device) {
    super(0x3A, device);
  }

  /**
   * Processing command response.
   * 
   * @param {Buffer} data 
   */
  response (data) {
    return data.toString();
  }

}

module.exports = ExtractBarcodeData;

/* End of file ExtractBarcodeData.js */