/**
 * Identification.js
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
 * Class Identification
 * 
 * Command for request "Software Part Number", "Serial Number", "Asset Number".
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Identification extends Command {

  /**
   * Identification constructor
   * 
   * @param {Object} device 
   */
  constructor (device) {
    super(0x37, device);
  }

  /**
   * Processing command response.
   * 
   * @param {Buffer} data 
   */
  response (data) {
    return {
      model  : data.slice(0, 15).toString().trim(),
      serial : data.slice(15, 27).toString().trim(),
      asset  : data.slice(27, 34).toString('hex')
    };
  }

}

module.exports = Identification;

/* End of file Identification.js */