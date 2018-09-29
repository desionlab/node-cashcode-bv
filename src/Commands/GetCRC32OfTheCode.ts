/**
 * GetCRC32OfTheCode.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */

import { Command } from '../Command';

/**
 * Class GetCRC32OfTheCode
 * 
 * Command for request Bill Validator firmware CRC32.
 * 
 * @description CCNet Document 1
 * @version 1.0.0
 */
export class GetCRC32OfTheCode extends Command {
  
  /**
   * GetCRC32OfTheCode constructor.
   */
  public constructor () {
    super(0x51);
  }

}

/* End of file GetCRC32OfTheCode.ts */