/**
 * Constants.js
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2018 Desionlab
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

/* Message transmission start code. */
const SYNC = 0x02;

/*  */
const CRC_POLY = 0x08408;

/* Peripheral addresses. */
const ADR_BILL_TO_BILL   = 0x01;
const ADR_COIN_CHANGER   = 0x02;
const ADR_BILL_VALIDATOR = 0x03;
const ADR_CARD_READER    = 0x04;

module.exports = {
  SYNC,
  CRC_POLY,
  ADR_BILL_TO_BILL,
  ADR_COIN_CHANGER,
  ADR_BILL_VALIDATOR,
  ADR_CARD_READER
};

/* End of file Constants.js */