"use strict";
/**
 * DeviceInfo.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class DeviceInfo
 *
 * Implementing methods for working with device information.
 *
 * @version 1.0.0
 */
class DeviceInfo {
    /**
     * DeviceInfo constructor.
     *
     * @param info Raw info from the device.
     * @param crc Raw crc from the device.
     */
    constructor(info, crc) {
        /**
         * Device part number.
         */
        this.model = null;
        /**
         * Device serial number.
         */
        this.serial = null;
        /**
         * Device asset number.
         */
        this.asset = null;
        /**
         * CRC 32 of the code.
         */
        this.crc = 0;
        /* Pars info data. */
        this.model = info.toString('ascii', 0, 15).trim();
        this.serial = info.toString('ascii', 15, 27).trim();
        this.asset = info.toString('hex', 27, 34).trim();
        /* Pars crc data. */
        this.crc = crc.readInt32BE(0);
    }
}
exports.DeviceInfo = DeviceInfo;
/* End of file DeviceInfo.ts */ 
