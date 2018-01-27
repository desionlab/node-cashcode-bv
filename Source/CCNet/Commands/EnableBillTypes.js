/**
 * EnableBillTypes.js
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
 * Class EnableBillTypes
 * 
 * Indicates Bill Type enable or disable. 
 * Command is followed by set-up data.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class EnableBillTypes extends Command {

  /**
   * EnableBillTypes constructor
   * 
   * @param {Object} device 
   */
  constructor (device) {
    super(0x34, device);
  }

  /**
   * Preparing command to send.
   * 
   * @param {Array} data 
   */
  request (data = []) {
    return this.assemble(new Buffer(data));
  }

  /**
   * Processing command response.
   * 
   * @param {Buffer} data 
   */
  response (data) {
    if (data[0] == 0) {
      return true;
    } else {
      return false;
    }
  }

}

module.exports = EnableBillTypes;

/* End of file EnableBillTypes.js */