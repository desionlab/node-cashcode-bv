/**
 * SetBarcodeParameters.js
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
 * Class SetBarcodeParameters
 * 
 * Command for settings the barcode format and number of characters.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class SetBarcodeParameters extends Command {

  /**
   * SetBarcodeParameters constructor
   * 
   * @param {Object} device 
   */
  constructor (device) {
    super(0x39, device);
  }

  /**
   * Preparing command to send.
   * 
   * @param {Array} params 
   */
  request (params = [0x01, 0x06]) {
    return this.assemble(new Buffer(params));
  }
  
}

module.exports = SetBarcodeParameters;

/* End of file SetBarcodeParameters.js */