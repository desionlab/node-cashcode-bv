/**
 * Nak.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */

import { Command } from '../Command';

/**
 * Class Nak
 *
 * Command for response was not correctly received.
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
export class Nak extends Command {
  /**
   * Nak constructor.
   */
  public constructor() {
    super(0xff);
  }
}
