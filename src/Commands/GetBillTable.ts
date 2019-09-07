/**
 * GetBillTable.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */

import { Command } from '../Command';

/**
 * Class GetBillTable
 *
 * Command for get bill types description.
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
export class GetBillTable extends Command {
  /**
   * GetBillTable constructor.
   */
  public constructor() {
    super(0x41);
  }
}
