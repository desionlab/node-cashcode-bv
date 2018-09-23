/**
 * Command.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */

/**
 * Class Command
 * 
 * An abstract class of device command logic.
 * 
 * @version 1.0.0
 */
export abstract class Command {

  public constructor () {
    
  }

  public request () {

  }

  /**
   * Processing command response.
   * 
   * @param data Data received from the device.
   * @returns { any } The processed data are presented in a convenient form.
   */
  public response (data: Buffer) {

  }

  protected assemble () {

  }

}

/* End of file Command.ts */