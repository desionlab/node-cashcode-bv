/**
 * Ack.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */

import { Command } from '../Command';

/**
 * Class Ack
 * 
 * Command to confirm a response correctly received.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
export class Ack extends Command {
  
  /**
   * Ack constructor.
   */
  public constructor () {
    super(0x00);
  }

}

/* End of file Ack.ts */