"use strict";
/**
 * Device.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
/**
 * List of supported speed modes.
 */
var DeviceBaudRate;
(function (DeviceBaudRate) {
    DeviceBaudRate[DeviceBaudRate["DBR9600"] = 9600] = "DBR9600";
    DeviceBaudRate[DeviceBaudRate["DBR19200"] = 19200] = "DBR19200";
})(DeviceBaudRate = exports.DeviceBaudRate || (exports.DeviceBaudRate = {}));
/**
 * Class Device
 *
 * The object implements the main methods and events for working
 * with the "CashCode" bill acceptor using the "CCNet" protocol.
 *
 * @version 1.0.0
 */
class Device extends events_1.EventEmitter {
    /**
     * Device constructor.
     *
     * @param port Serialport address.
     * @param baudRate Serialport baud rate.
     * @param debug Printing debug info.
     */
    constructor(port, baudRate = DeviceBaudRate.DBR9600, debug = false) {
        super();
    }
}
exports.Device = Device;
/* End of file Device.ts */ 
