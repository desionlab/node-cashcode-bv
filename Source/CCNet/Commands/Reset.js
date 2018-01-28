/**
 * Reset.js
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
 * Class Reset
 * 
 * Command for Bill Validator to self-reset.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Reset extends Command {

  /**
   * Reset constructor
   * 
   * @param {Object} device 
   */
  constructor (device) {
    super(0x30, device);
  }
  
}

module.exports = Reset;

/* End of file Reset.js */