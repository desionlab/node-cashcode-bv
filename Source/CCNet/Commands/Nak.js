/**
 * Nak.js
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
 * Class Nak
 * 
 * Command for response was not correctly received.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Nak extends Command {

  /**
   * Nak constructor
   * 
   * @param {Object} device 
   */
  constructor (device) {
    super(0xFF, device);
  }

  /**
   * Preparing command to send.
   * 
   * @param {*} data 
   */
  request () {
    var cmd = new Buffer([
      CCNet.SYNC,
      this.device.adr,
      0x06,
      this.cmd
    ]);
    return Buffer.concat([
      cmd,
      this.device.getCRC16(cmd)
    ]);
  }

}

module.exports = Nak;

/* End of file Nak.js */