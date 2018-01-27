/**
 * Download.js
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
 * Class Download
 * 
 * Command for transition to download mode.
 * 
 * @description CCNet Document 2
 * @version 1.0.0
 */
class Download extends Command {

  /**
   * Download constructor
   * 
   * @param {Object} device 
   */
  constructor (device) {
    super(0x50, device);
  }

}

module.exports = Download;

/* End of file Ack.js */