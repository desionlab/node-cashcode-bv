/**
 * Identification.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2019 Desionlab
 * @license   MIT
 */

import { Command } from '../Command';

/**
 * Class Identification
 *
 * Command for request "Software Part Number", "Serial Number", "Asset Number".
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
export class Identification extends Command {
  /**
   * Identification constructor.
   */
  public constructor() {
    super(0x37);
  }
}
