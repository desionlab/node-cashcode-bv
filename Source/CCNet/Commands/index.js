/**
 * index.js
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2018 Desionlab
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

/* Export CCNet commands. */
module.exports = function (device) {
  return {
    Ack : new (require('./Ack'))(device),
    Download : new (require('./Download'))(device),
    EnableBillTypes : new (require('./EnableBillTypes'))(device),
    ExtractBarcodeData : new (require('./ExtractBarcodeData'))(device),
    GetBillTable : new (require('./GetBillTable'))(device),
    GetCRC32OfTheCode : new (require('./GetCRC32OfTheCode'))(device),
    GetStatus : new (require('./GetStatus'))(device),
    Hold : new (require('./Hold'))(device),
    Identification : new (require('./Identification'))(device),
    Nak : new (require('./Nak'))(device),
    Poll : new (require('./Poll'))(device),
    RequestStatistics : new (require('./RequestStatistics'))(device),
    Reset : new (require('./Reset'))(device),
    Return : new (require('./Return'))(device),
    SetBarcodeParameters : new (require('./SetBarcodeParameters'))(device),
    SetSecurity : new (require('./SetSecurity'))(device),
    Stack : new (require('./Stack'))(device)
  }
};

/* End of file index.js */