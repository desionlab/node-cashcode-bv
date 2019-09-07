/**
 * Stack.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2019 Desionlab
 * @license   MIT
 */

import { Command } from '../Command';

/**
 * Class Stack
 *
 * Command for sent by Controller to send a bill in escrow to the drop cassette.
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
export class Stack extends Command {
  /**
   * Stack constructor.
   */
  public constructor() {
    super(0x35);
  }
}
