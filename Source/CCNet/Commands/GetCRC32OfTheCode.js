/**
 * GetCRC32OfTheCode.js
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
 * Class GetCRC32OfTheCode
 * 
 * Command for request Bill Validator firmware CRC32.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class GetCRC32OfTheCode extends Command {

  /**
   * GetCRC32OfTheCode constructor
   * 
   * @param {Object} device 
   */
  constructor (device) {
    super(0x51, device);
  }

}

module.exports = GetCRC32OfTheCode;

/* End of file GetCRC32OfTheCode.js */