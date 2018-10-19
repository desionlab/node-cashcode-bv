/**
 * Utils.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
/// <reference types="node" />
/**
 * Calculation packet checksum.
 *
 * @param buffer Raw data for calculation.
 */
export declare function getCRC16(buffer: Buffer): any;
/**
 * Class Array8Bit.
 *
 * By bit representation of 8 bit buffer in an array and back.
 *
 * @version 1.0.0
 */
export declare class Array8Bit {
    /**
     *
     */
    protected items: Buffer;
    /**
     *
     */
    protected length: number;
    /**
     * Array8Bit constructor.
     *
     * @param length Array length.
     * @param buffer Source data buffer (optional).
     */
    constructor(length: number, buffer?: Buffer);
    /**
     * Create object from array.
     *
     * @param data Source data array.
     */
    static fromArray(data: Array<boolean>): Array8Bit;
    /**
     * Create object from buffer.
     *
     * @param buffer Source data buffer.
     */
    static fromBuffer(buffer: Buffer): Array8Bit;
    /**
     * Get array item state by number.
     *
     * @param n Item number.
     */
    get(n: number): boolean;
    /**
     * Set array item state to true.
     *
     * @param n Item number.
     */
    on(n: number): void;
    /**
     * Set array item state to false.
     *
     * @param n Item number.
     */
    off(n: number): void;
    /**
     * Set array item state to opposite meaning.
     *
     * @param n Item number.
     */
    toggle(n: number): void;
    /**
     *
     */
    toArray(): Array<boolean>;
    /**
     *
     */
    toBuffer(): Buffer;
}
