"use strict";
/**
 * Utils.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const CCNet_1 = require("./Const/CCNet");
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
                CRC ^= CCNet_1.CRC_POLY;
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
/* End of file Utils.ts */ 
