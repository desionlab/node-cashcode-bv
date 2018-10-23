/**
 * BillInfo.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
/// <reference types="node" />
/**
 * Class BillInfo
 *
 * Defines the parameters of a supported bill.
 *
 * @version 1.0.0
 */
export declare class BillInfo {
    /**
     * Denomination.
     */
    amount: number;
    /**
     * Country code.
     */
    code: string;
    /**
     * Security level.
     */
    security: boolean;
    /**
     * Allowed to receive.
     */
    enabled: boolean;
    /**
     * Bill constructor.
     *
     * @param data Raw data from the device.
     */
    constructor(data?: Buffer);
}
