/**
 * RequestStatistics.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2019 Desionlab
 * @license   MIT
 */

import { Command } from '../Command';

/**
 * Class RequestStatistics
 *
 * Command for retrieving full information about acceptance performance.
 *
 * @description CCNet Document 3
 * @version 1.0.0
 */
export class RequestStatistics extends Command {
  /**
   * RequestStatistics constructor.
   */
  public constructor() {
    super(0x60);
  }
}
