/**
 * GetBillTable.js
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
 * Class GetBillTable
 * 
 * Command for get bill types description.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
class GetBillTable extends Command {

  /**
   * GetBillTable constructor
   * 
   * @param {Object} device 
   */
  constructor (device) {
    super(0x41, device);
  }

  /**
   * Processing command response.
   * 
   * @param {Buffer} data 
   */
  response (data) {
    var response = [],
        word;

    for(var i = 0; i < 24; i++){
      /*  */
      word = data.slice(i * 5, (i * 5 + 5));

      /*  */
      response.push({
        amount: word[0] * Math.pow(10, word[4]),
        code: word.slice(1, 4).toString(),
        enabled: false,
        security: false
      });
    }
    
    return response;
  }

}

module.exports = GetBillTable;

/* End of file GetBillTable.js */