/**
 * GetStatus.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */

import { Command } from '../Command';

/**
 * Class GetStatus
 *
 * Command for request Bill Validator set-up status.
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
export class GetStatus extends Command {
  /**
   * GetStatus constructor.
   */
  public constructor() {
    super(0x31);
  }
}
