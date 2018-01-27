/**
 * Hold.js
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
 * Class Hold
 * 
 * Command for holding of Bill Validator in Escrow state.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Hold extends Command {

  /**
   * Hold constructor
   * 
   * @param {Object} device 
   */
  constructor (device) {
    super(0x38, device);
  }

}

module.exports = Hold;

/* End of file Hold.js */