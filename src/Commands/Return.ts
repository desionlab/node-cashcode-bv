/**
 * Return.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */

import { Command } from '../Command';

/**
 * Class Return
 * 
 * Command to return a bill in escrow.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
export class Return extends Command {
  
  /**
   * Return constructor.
   */
  public constructor () {
    super(0x36);
  }

}

/* End of file Return.ts */