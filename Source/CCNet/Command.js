/**
 * Command.js
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2018 Desionlab
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

const CCNet = require('./Constants');

/**
 * Class Command
 * 
 * An abstract class of device command logic.
 * 
 * @version 1.0.0
 */
class Command {
  
  /**
   * Command constructor.
   * 
   * @param {Number} cmd 
   * @param {Object} device 
   */
  constructor (cmd, device) {
    /* Command code. */
    this.cmd = cmd;

    /* Parent device object. */
    this.device = device;
  }

  /* Logics methods -------------------------------------------------------- */
  /* ----------------------------------------------------------------------- */

  /**
   * Preparing command to send.
   * 
   * @param {Any} params 
   */
  request (params = []) {
    return this.assemble(new Buffer(params));
  }

  /**
   * Processing command response.
   * 
   * @param {Buffer} data 
   */
  response (data) {
    return data;
  }

  /* Utils methods --------------------------------------------------------- */
  /* ----------------------------------------------------------------------- */
  
  /**
   * Assemble command packet.
   * 
   * @param {Buffer} params 
   */
  assemble (params = new Buffer(0)) {
    /* Assemble main packet data. */
    var cmd = Buffer.concat([
      /* Header. */
      new Buffer(
        [
          CCNet.SYNC,
          this.device.adr
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

    /*Assemble params packet data.  */
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
      this.device.getCRC16(cmd)
    ]);
  }

}

module.exports = Command;

/* End of file Command.js */