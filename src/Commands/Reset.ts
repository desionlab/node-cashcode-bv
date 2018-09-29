/**
 * Reset.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */

import { Command } from '../Command';

/**
 * Class Reset
 * 
 * Command for Bill Validator to self-reset.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
export class Reset extends Command {
  
  /**
   * Reset constructor.
   */
  public constructor () {
    super(0x30);
  }

}

/* End of file Reset.ts */