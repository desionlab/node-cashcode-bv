/**
 * Poll.js
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
 * Class Poll
 * 
 * Command for request Bill Validator activity status.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Poll extends Command {

  /**
   * Poll constructor
   * 
   * @param {Object} device 
   */
  constructor (device) {
    super(0x33, device);
  }

}

module.exports = Poll;

/* End of file Poll.js */