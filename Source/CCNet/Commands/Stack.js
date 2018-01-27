/**
 * Stack.js
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
 * Class Stack
 * 
 * Command for sent by Controller to send a bill in escrow to the drop cassette.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Stack extends Command {

  /**
   * Stack constructor
   * 
   * @param {Object} device 
   */
  constructor (device) {
    super(0x35, device);
  }
  
}

module.exports = Stack;

/* End of file Stack.js */