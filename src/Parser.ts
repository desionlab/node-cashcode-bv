/**
 * Parser.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2018 Desionlab
 * @license   MIT
 */

import { Transform, TransformOptions, TransformCallback } from 'stream';

/**
 * Class Parser
 *
 * Pars CCNet packet.
 *
 * @version 1.0.0
 */
export class Parser extends Transform {
  /**
   * Packet container.
   */
  protected packet: Buffer = new Buffer(0);

  /**
   * Packet full length.
   */
  protected packetLength: number = 0;

  /* ----------------------------------------------------------------------- */

  /**
   * Parser constructor.
   */
  public constructor(options?: TransformOptions) {
    super(options);
  }

  /**
   * Receive and pars CCNet packet.
   *
   * @param chunk Received buffer.
   * @param encoding
   * @param callback
   */
  public _transform(chunk: any, encoding: string, callback: TransformCallback) {
    this.packet = Buffer.concat([this.packet, chunk]);

    if (this.packet.length >= 3 && this.packetLength === 0) {
      this.packetLength = parseInt(this.packet[2].toString(), 10);
    }

    if (this.packet.length === this.packetLength) {
      this.push(this.packet);
      this.packet = new Buffer(0);
      this.packetLength = 0;
    }

    callback();
  }
}
