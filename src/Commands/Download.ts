/**
 * Download.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */

import { Command } from '../Command';

/**
 * Class Download
 * 
 * Command for transition to download mode.
 * 
 * @description CCNet Document 2
 * @version 1.0.0
 */
export class Download extends Command {
  
  /**
   * Download constructor.
   */
  public constructor () {
    super(0x50);
  }

}

/* End of file Download.ts */