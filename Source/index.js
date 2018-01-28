/**
 * index.js
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2018 Desionlab
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

/* Get CCNet components. */
let CCNet = require('./CCNet');

/* Get CCTalk components. */
let CCTalk = require('./CCTalk');

/* Export library objects. */
module.exports = {
  /*  */
  CCNet,
  
  /*  */
  CCTalk
};

/* End of file index.js */