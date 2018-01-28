/**
 * RequestStatistics.js
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
 * Class RequestStatistics
 * 
 * Command for retrieving full information about acceptance performance.
 * 
 * @description CCNet Document 3
 * @version 1.0.0
 */
class RequestStatistics extends Command {

  /**
   * RequestStatistics constructor
   * 
   * @param {Object} device 
   */
  constructor (device) {
    super(0x60, device);
  }

  /**
   * Processing command response.
   * 
   * @param {Buffer} data 
   */
  response (data) {
    return data;
  }

}

module.exports = RequestStatistics;

/* End of file RequestStatistics.js */