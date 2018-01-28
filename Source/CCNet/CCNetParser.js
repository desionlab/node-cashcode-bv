/**
 * CCNetParser.js
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2018 Desionlab
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

const Transform = require('stream').Transform;

/**
 * Class CCNetParser
 * 
 * Receive and pars CCNet packet.
 * 
 * @version 1.0.0
 */
class CCNetParser extends Transform {

  /**
   * CCNetParser constructor.
   */
  constructor (options = null) {
    super(options);
    
    /* Packet container. */
    this.packet = new Buffer(0);

    /* Packet full length. */
    this.packetLength = 0;
  }

  /**
   * Receive and pars ccnet packet. 
   */
  _transform (buffer, encoding, callback) {
    /*  */
    this.packet = Buffer.concat([this.packet, buffer]);

    /*  */
    if (this.packet.length >= 3 && this.packetLength === 0) {
      this.packetLength = parseInt(this.packet[2].toString());
    }

    /*  */
    if (this.packet.length == this.packetLength) {
      /*  */
      this.push(this.packet);
      
      /*  */
      this.packet = new Buffer(0);
      
      /*  */
      this.packetLength = 0;
    }
    
    /*  */
    callback();
  }

}

module.exports = CCNetParser;

/* End of file CCNetParser.js */