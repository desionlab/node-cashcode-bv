"use strict";
/**
 * Parser.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
/**
 * Class Parser
 *
 * Pars CCNet packet.
 *
 * @version 1.0.0
 */
class Parser extends stream_1.Transform {
    /* ----------------------------------------------------------------------- */
    /**
     * Parser constructor.
     */
    constructor(options) {
        super(options);
        /**
         * Packet container.
         */
        this.packet = new Buffer(0);
        /**
         * Packet full length.
         */
        this.packetLength = 0;
    }
    /**
     * Receive and pars CCNet packet.
     *
     * @param chunk Received buffer.
     * @param encoding
     * @param callback
     */
    _transform(chunk, encoding, callback) {
        this.packet = Buffer.concat([this.packet, chunk]);
        if (this.packet.length >= 3 && this.packetLength === 0) {
            this.packetLength = parseInt(this.packet[2].toString());
        }
        if (this.packet.length == this.packetLength) {
            this.push(this.packet);
            this.packet = new Buffer(0);
            this.packetLength = 0;
        }
        callback();
    }
}
exports.Parser = Parser;
/* End of file Parser.ts */ 
