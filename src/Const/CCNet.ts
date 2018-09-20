/**
 * CCNet.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2018 Desionlab
 * @license   MIT
 */

/**
 * Message transmission start code.
 */
export const SYNC = 0x02;

/**
 * Poly for CRC calculated.
 */
export const CRC_POLY = 0x08408;

/**
 * Bill to bill peripheral addresses.
 */
export const ADR_BILL_TO_BILL = 0x01;

/**
 * Coin changer peripheral addresses.
 */
export const ADR_COIN_CHANGER = 0x02;

/**
 * Bill validator peripheral addresses.
 */
export const ADR_BILL_VALIDATOR = 0x03;

/**
 * Card reader peripheral addresses.
 */
export const ADR_CARD_READER = 0x04;

/* End of file CCNet.ts */