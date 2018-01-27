/**
 * Return.js
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
 * Class Return
 * 
 * Command to return a bill in escrow.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Return extends Command {

  /**
   * Return constructor
   * 
   * @param {Object} device 
   */
  constructor (device) {
    super(0x36, device);
  }
  
}

module.exports = Return;

/* End of file Return.js */