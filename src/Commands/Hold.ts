/**
 * Hold.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2019 Desionlab
 * @license   MIT
 */

import { Command } from '../Command';

/**
 * Class Hold
 *
 * Command for holding of Bill Validator in Escrow state.
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
export class Hold extends Command {
  /**
   * Hold constructor.
   */
  public constructor() {
    super(0x38);
  }
}
