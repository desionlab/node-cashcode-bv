/**
 * Utils.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */

import { CRC_POLY } from './Const/CCNet';

/**
 * Calculation packet checksum.
 * 
 * @param buffer Raw data for calculation.
 */
export function getCRC16 (buffer: Buffer) {
  var CRC, i, j;
  var sizeData = buffer.length;

  CRC = 0;

  for (i = 0; i < sizeData; i++) {
      CRC ^= buffer[i];

      for (j = 0; j < 8; j++) {

          if (CRC & 0x0001) {
              CRC >>= 1;
              CRC ^= CRC_POLY;
          } else CRC >>= 1;
      }
  }

  var buf = new Buffer(2);
  buf.writeUInt16BE(CRC, 0);

  CRC = buf;
  
  return Array.prototype.reverse.call(CRC);
}

/* End of file Utils.ts */