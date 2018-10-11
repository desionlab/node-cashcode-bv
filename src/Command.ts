/**
 * Command.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */

import * as CCNet from './Const/CCNet';
import { getCRC16 } from './Utils';

/**
 * Class Command
 * 
 * An class of device command logic.
 * 
 * @version 1.0.0
 */
export class Command {

  /**
   * Device command code.
   */
  protected cmd: number = null;

  /**
   * Command constructor.
   * 
   * @param cmd Device command code.
   */
  public constructor (cmd: number) {
    this.cmd = cmd;
  }

  /**
   * Preparing command to send.
   * 
   * @param params Parameters of the command being passed.
   */
  public request (params: any | null = []) : Buffer {
    return this.assemble(new Buffer(params));
  }

  /**
   * Processing command response.
   * 
   * @param data Data received from the device.
   */
  public response (data: Buffer) : any {
    return data;
  }

  /**
   * Assemble command packet.
   * 
   * @param params 
   */
  protected assemble (params: Buffer = new Buffer(0)) : Buffer {
    /* Assemble main packet data. */
    let cmd = Buffer.concat([
      /* Header. */
      new Buffer(
        [
          CCNet.SYNC,
          CCNet.ADR_BILL_VALIDATOR
        ]
      ),
      /* Length. */
      new Buffer(
        [
          (params.length + 6)
        ]
      ),
      /* Command. */
      new Buffer(
        [
          this.cmd
        ]
      )
    ]);

    /* Assemble params packet data. */
    if (params.length) {
      cmd = Buffer.concat([
        /* Main packet data. */
        cmd,
        /* Command params. */
        params
      ]);
    }

    /* Assemble full packet data. */
    return Buffer.concat([
      cmd,
      getCRC16(cmd)
    ]);
  }

}

/* End of file Command.ts */