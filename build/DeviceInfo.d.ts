/**
 * DeviceInfo.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
/// <reference types="node" />
/**
 * Class DeviceInfo
 *
 * Implementing methods for working with device information.
 *
 * @version 1.0.0
 */
export declare class DeviceInfo {
    /**
     * Device part number.
     */
    model: string;
    /**
     * Device serial number.
     */
    serial: string;
    /**
     * Device asset number.
     */
    asset: string;
    /**
     * CRC 32 of the code.
     */
    crc: number;
    /**
     * DeviceInfo constructor.
     *
     * @param info Raw info from the device.
     * @param crc Raw crc from the device.
     */
    constructor(info: Buffer, crc: Buffer);
}
