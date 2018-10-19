"use strict";
/**
 * Utils.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Const_1 = require("./Const");
/**
 * Calculation packet checksum.
 *
 * @param buffer Raw data for calculation.
 */
function getCRC16(buffer) {
    var CRC, i, j;
    var sizeData = buffer.length;
    CRC = 0;
    for (i = 0; i < sizeData; i++) {
        CRC ^= buffer[i];
        for (j = 0; j < 8; j++) {
            if (CRC & 0x0001) {
                CRC >>= 1;
                CRC ^= Const_1.CRC_POLY;
            }
            else
                CRC >>= 1;
        }
    }
    var buf = new Buffer(2);
    buf.writeUInt16BE(CRC, 0);
    CRC = buf;
    return Array.prototype.reverse.call(CRC);
}
exports.getCRC16 = getCRC16;
/**
 * Class Array8Bit.
 *
 * By bit representation of 8 bit buffer in an array and back.
 *
 * @version 1.0.0
 */
class Array8Bit {
    /* --------------------------------------------------------------------- */
    /**
     * Array8Bit constructor.
     *
     * @param length Array length.
     * @param buffer Source data buffer (optional).
     */
    constructor(length, buffer) {
        /**
         *
         */
        this.items = null;
        /**
         *
         */
        this.length = 0;
        if (buffer) {
            this.items = buffer;
        }
        else {
            this.items = Buffer.alloc(Math.ceil(length / 8));
        }
        this.length = length;
    }
    /* --------------------------------------------------------------------- */
    /**
     * Create object from array.
     *
     * @param data Source data array.
     */
    static fromArray(data) {
        let instant = new Array8Bit(data.length);
        data.forEach((element, index) => {
            if (element) {
                instant.on(index);
            }
            else {
                instant.off(index);
            }
        });
        return instant;
    }
    /**
     * Create object from buffer.
     *
     * @param buffer Source data buffer.
     */
    static fromBuffer(buffer) {
        return new Array8Bit(buffer.length * 8, buffer);
    }
    /* --------------------------------------------------------------------- */
    /**
     * Get array item state by number.
     *
     * @param n Item number.
     */
    get(n) {
        return (this.items[n / 8 | 0] & 1 << n % 8) > 0;
    }
    /**
     * Set array item state to true.
     *
     * @param n Item number.
     */
    on(n) {
        this.items[n / 8 | 0] |= 1 << n % 8;
    }
    /**
     * Set array item state to false.
     *
     * @param n Item number.
     */
    off(n) {
        this.items[n / 8 | 0] &= ~(1 << n % 8);
    }
    /**
     * Set array item state to opposite meaning.
     *
     * @param n Item number.
     */
    toggle(n) {
        this.items[n / 8 | 0] ^= 1 << n % 8;
    }
    /* --------------------------------------------------------------------- */
    /**
     *
     */
    toArray() {
        const max = 8;
        let data = [];
        this.items.forEach((number, container) => {
            for (let x = 0; x < max; x++) {
                data.push((number & 1 << x) > 0);
            }
        });
        return data;
    }
    /**
     *
     */
    toBuffer() {
        return this.items;
    }
}
exports.Array8Bit = Array8Bit;
/* End of file Utils.ts */ 
