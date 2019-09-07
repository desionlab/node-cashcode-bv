/**
 * EnableBillTypes.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2019 Desionlab
 * @license   MIT
 */

import { Command } from '../Command';

/**
 * Class EnableBillTypes
 *
 * Command to set indicates Bill Type enable or disable.
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
export class EnableBillTypes extends Command {
  /**
   * EnableBillTypes constructor.
   */
  public constructor() {
    super(0x34);
  }
}
