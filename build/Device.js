"use strict";
/**
 * Device.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serialport_1 = __importDefault(require("serialport"));
const Parser_1 = require("./Parser");
const events_1 = require("events");
/**
 * Class Device
 *
 * The object implements the main methods and events for working
 * with the "CashCode" bill acceptor using the "CCNet" protocol.
 *
 * @version 1.0.0
 */
class Device extends events_1.EventEmitter {
    /* ----------------------------------------------------------------------- */
    /**
     * Device constructor.
     *
     * @param port Serial port address.
     * @param options Serial port open options.
     * @param debug Printing debug info.
     */
    constructor(port, options, debug) {
        super();
        /**
         * Serialport address.
         */
        this.port = '';
        /**
         * Serialport options.
         */
        this.options = {
            baudRate: 9600,
            dataBits: 8,
            stopBits: 1,
            parity: 'none',
            autoOpen: false
        };
        /**
         * Debug mode flag.
         */
        this.debug = false;
        /**
         * Serialport transport instant.
         */
        this.serial = null;
        /**
         * CCNet packet parser instant.
         */
        this.parser = null;
        /**
         * Main status code.
         */
        this.status = null;
        /**
         * List of pending commands.
         */
        this.queue = [];
        /**
         * Operating timer.
         */
        this.tickTakInterval = null;
        /* --------------------------------------------------------------------- */
        /* Set serialport address. */
        this.port = port;
        /* Set serialport options. */
        if (options) {
            this.options = Object.assign(this.options, options);
        }
        /* Set debug flag. */
        if (debug) {
            this.debug = debug;
        }
        /* --------------------------------------------------------------------- */
        /* Bind operating timer event. */
        this.on('nextTick', () => this.onNextTick);
        /* --------------------------------------------------------------------- */
        /* Create serialport transport. */
        this.serial = new serialport_1.default(this.port, this.options, null);
        /* Bind serial open event. */
        this.serial.on('open', () => this.onSerialPortOpen);
        /* Bind serial error event. */
        this.serial.on('error', (error) => this.onSerialPortError);
        /* Bind serial close event. */
        this.serial.on('close', () => this.onSerialPortClose);
        /* Set CCNet packet parser. */
        this.parser = this.serial.pipe(new Parser_1.Parser());
        /* --------------------------------------------------------------------- */
    }
    /* ----------------------------------------------------------------------- */
    /**
     * Flag of the established connection to the device.
     */
    get isConnect() {
        return (this.serial.isOpen);
    }
    /* ----------------------------------------------------------------------- */
    /**
     * Connect to device.
     */
    async connect() { }
    /**
     * Disconnect from device.
     */
    async disconnect() { }
    /**
     *
     */
    async reset() { }
    /**
     *
     */
    async getInfo() { }
    /**
     *
     */
    async getBillTable() { }
    /**
     *
     */
    async beginEscrow() { }
    /**
     *
     */
    async billHold() { }
    /**
     *
     */
    async billStack() { }
    /**
     *
     */
    async billReturn() { }
    /**
     *
     */
    async endEscrow() { }
    /* ----------------------------------------------------------------------- */
    /**
     * On serial open event.
     */
    onSerialPortOpen() {
        /* Start operating timer. */
        this.tickTakInterval = setInterval(() => {
            this.emit('nextTick');
        }, 100);
    }
    /**
     * On serial error event.
     *
     * @param error Serialport error object.
     */
    onSerialPortError(error) {
        /* Stop operating timer. */
        clearInterval(this.tickTakInterval);
    }
    /**
     * On serial close event.
     */
    onSerialPortClose() {
        /* Stop operating timer. */
        clearInterval(this.tickTakInterval);
    }
    /**
     * Operating timer event.
     */
    onNextTick() { }
    /**
     * All status events handler.
     *
     * @param status Current devise status.
     */
    onStatus(status) { }
}
exports.Device = Device;
/* End of file Device.ts */ 
