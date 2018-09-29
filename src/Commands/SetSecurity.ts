/**
 * SetSecurity.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */

import { Command } from '../Command';

/**
 * Class SetSecurity
 * 
 * Command to sets Bill Validator security mode.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
export class SetSecurity extends Command {
  
  /**
   * SetSecurity constructor.
   */
  public constructor () {
    super(0x32);
  }

}

/* End of file SetSecurity.ts */