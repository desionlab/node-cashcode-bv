/**
 * Utils.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */

import { CRC_POLY } from './Const';

/**
 * Calculation packet checksum.
 *
 * @param buffer Raw data for calculation.
 */
export function getCRC16(buffer: Buffer): any {
  let i: number, j: number, CRC: number;
  const sizeData: number = buffer.length;

  CRC = 0;

  for (i = 0; i < sizeData; i++) {
    CRC ^= buffer[i];

    for (j = 0; j < 8; j++) {
      if (CRC & 0x0001) {
        CRC >>= 1;
        CRC ^= CRC_POLY;
      } else {
        CRC >>= 1;
      }
    }
  }

  const buf = new Buffer(2);
  buf.writeUInt16BE(CRC, 0);

  return Array.prototype.reverse.call(buf);
}

/**
 * Class Array8Bit.
 *
 * By bit representation of 8 bit buffer in an array and back.
 *
 * @version 1.0.0
 */
export class Array8Bit {
  /**
   *
   */
  protected items: Buffer = null;

  /**
   *
   */
  protected length: number = 0;

  /* --------------------------------------------------------------------- */

  /**
   * Array8Bit constructor.
   *
   * @param length Array length.
   * @param buffer Source data buffer (optional).
   */
  public constructor(length: number, buffer?: Buffer) {
    // tslint:disable-next-line: prefer-conditional-expression
    if (buffer) {
      this.items = buffer;
    } else {
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
  public static fromArray(data: boolean[]): Array8Bit {
    const instant = new Array8Bit(data.length);

    data.forEach((element: boolean, index: number) => {
      if (element) {
        instant.on(index);
      } else {
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
  public static fromBuffer(buffer: Buffer): Array8Bit {
    return new Array8Bit(buffer.length * 8, buffer);
  }

  /* --------------------------------------------------------------------- */

  /**
   * Get array item state by number.
   *
   * @param n Item number.
   */
  public get(n: number): boolean {
    return (this.items[(n / 8) | 0] & (1 << n % 8)) > 0;
  }

  /**
   * Set array item state to true.
   *
   * @param n Item number.
   */
  public on(n: number): void {
    this.items[(n / 8) | 0] |= 1 << n % 8;
  }

  /**
   * Set array item state to false.
   *
   * @param n Item number.
   */
  public off(n: number): void {
    this.items[(n / 8) | 0] &= ~(1 << n % 8);
  }

  /**
   * Set array item state to opposite meaning.
   *
   * @param n Item number.
   */
  public toggle(n: number): void {
    this.items[(n / 8) | 0] ^= 1 << n % 8;
  }

  /* --------------------------------------------------------------------- */

  /**
   *
   */
  public toArray(): boolean[] {
    const max: number = 8;
    const data: boolean[] = [];

    this.items.forEach((num, container) => {
      for (let x = 0; x < max; x++) {
        data.push((num & (1 << x)) > 0);
      }
    });

    return data;
  }

  /**
   *
   */
  public toBuffer(): Buffer {
    return this.items;
  }
}
