/**
 * Parser.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2018 Desionlab
 * @license   MIT
 */
/// <reference types="node" />
import { Transform, TransformOptions, TransformCallback } from 'stream';
/**
 * Class Parser
 *
 * Pars CCNet packet.
 *
 * @version 1.0.0
 */
export declare class Parser extends Transform {
    /**
     * Packet container.
     */
    protected packet: Buffer;
    /**
     * Packet full length.
     */
    protected packetLength: number;
    /**
     * Parser constructor.
     */
    constructor(options?: TransformOptions);
    /**
     * Receive and pars CCNet packet.
     *
     * @param chunk Received buffer.
     * @param encoding
     * @param callback
     */
    _transform(chunk: any, encoding: string, callback: TransformCallback): void;
}
