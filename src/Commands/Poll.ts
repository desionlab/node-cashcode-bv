/**
 * Poll.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */

import { Command } from '../Command';

/**
 * Class Poll
 * 
 * Command for request Bill Validator activity status.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
export class Poll extends Command {
  
  /**
   * Poll constructor.
   */
  public constructor () {
    super(0x33);
  }

}

/* End of file Poll.ts */