/**
 * index.js
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2018 Desionlab
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

/* Get CCNet constants. */
let CCNet = require('./Constants');

/* Add Bill Validator object. */
CCNet.BillValidator = require('./BillValidator');

/* Export library objects. */
module.exports = CCNet;

/* End of file index.js */