"use strict";
/**
 * BillInfo.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class BillInfo
 *
 * Defines the parameters of a supported bill.
 *
 * @version 1.0.0
 */
class BillInfo {
    /**
     * Bill constructor.
     *
     * @param data Raw data from the device.
     */
    constructor(data) {
        /**
         * Denomination.
         */
        this.amount = 0;
        /**
         * Country code.
         */
        this.code = '';
        /**
         * Security level.
         */
        this.security = false;
        /**
         * Allowed to receive.
         */
        this.enabled = false;
        if (data) {
            this.amount = data[0] * Math.pow(10, data[4]);
            this.code = data.toString('ascii', 1, 4).trim();
            /* Clear not used item. */
            if (this.code == "\u0000\u0000\u0000") {
                this.code = '';
            }
        }
    }
}
exports.BillInfo = BillInfo;
/* End of file BillInfo.ts */ 
