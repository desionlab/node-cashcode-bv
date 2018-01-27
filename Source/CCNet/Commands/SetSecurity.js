/**
 * SetSecurity.js
 * 
 * @author    fenixphp <fenixphp@gmail.com>
 * @copyright 2014 - 2017 Desionlab
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

const CCNet = require('./../Constants');
const Command = require('./../Command');

/**
 * Class SetSecurity
 * 
 * Command to sets Bill Validator security mode.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class SetSecurity extends Command {

  /**
   * SetSecurity constructor
   * 
   * @param {Object} device 
   */
  constructor (device) {
    super(0x32, device);
  }

  /**
   * Preparing command to send.
   * 
   * @param {Array} params 
   */
  request (params = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00]) {
    return this.assemble(new Buffer(params));
  }

}

module.exports = SetSecurity;

/* End of file SetSecurity.js */