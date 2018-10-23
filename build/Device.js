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
     * @param logger Logger instant.
     * @param debugPackets Flag allowing to log received, sent data packets.
     */
    constructor(port, options, logger, debugPackets) {
        super();
        /* ----------------------------------------------------------------------- */
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
         * Serialport transport instant.
         */
        this.serial = null;
        /**
         * CCNet packet parser instant.
         */
        this.parser = null;
        /* ----------------------------------------------------------------------- */
        /**
         * The logger. You can pass electron-log, winston or another logger
         * with the following interface: { info(), debug(), warn(), error() }.
         * Set it to null if you would like to disable a logging feature.
         */
        this.logger = null;
        /**
         * Flag allowing to log received, sent data packets.
         */
        this.debugPackets = false;
        /* ----------------------------------------------------------------------- */
        /**
         * The current status of the device.
         */
        this._status = null;
        /**
         * Device main information.
         */
        this._info = null;
        /**
         * List of supported bills.
         */
        this._billTable = [];
        /**
         * Bills status flags sets.
         */
        this._billStatus = {
            /**
             * The list of flags allowed to accept bills.
             */
            enabled: [true, true, true, true, true, true, true, true, true,
                true, true, true, true, true, true, true, true, true, true, true,
                true, true, true, true],
            /**
             * List of security flags for bills.
             */
            security: [false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false],
            /**
             * List of escrow flags for bills.
             */
            escrow: [true, true, true, true, true, true, true, true, true,
                true, true, true, true, true, true, true, true, true, true, true,
                true, true, true, true]
        };
        /* ----------------------------------------------------------------------- */
        /**
         * A flag indicating the current command execution.
         */
        this.busy = false;
        /**
         * List of pending commands.
         */
        this.queue = [];
        /**
         * Operating timer interval.
         */
        this.timerMs = 100;
        /**
         * Operating timer.
         */
        this.timerInterval = null;
        /* Set serialport address. */
        this.port = port;
        /* Set serialport options. */
        if (options) {
            this.options = Object.assign(this.options, options);
        }
        /* Set logger instant. */
        if (logger) {
            this.logger = logger;
        }
        /* Set packets log flag. */
        if (debugPackets) {
            this.debugPackets = debugPackets;
        }
    }
    /**
     * Getter for a current status of the device.
     */
    get status() {
        return this._status;
    }
    /**
     * Getter for a device main information.
     */
    get info() {
        return this._info;
    }
    /**
     * Getter for a list of supported bills.
     */
    get billTable() {
        return this._billTable;
    }
    /**
     * Getter a bills status flags sets.
     */
    get billStatus() {
        return this._billStatus;
    }
    /**
     * Setter a bills status flags sets.
     */
    set billStatus(value) {
        this._billStatus = value;
    }
    /* ----------------------------------------------------------------------- */
    open() {
        return new Promise(async (resolve, reject) => { });
    }
    connect() {
        return new Promise(async (resolve, reject) => { });
    }
    disconnect() {
        return new Promise(async (resolve, reject) => { });
    }
    close() {
        return new Promise(async (resolve, reject) => { });
    }
    /* ----------------------------------------------------------------------- */
    reset() {
        return new Promise(async (resolve, reject) => { });
    }
    getInfo() {
        return new Promise(async (resolve, reject) => { });
    }
    getBillTable() {
        return new Promise(async (resolve, reject) => { });
    }
    getBillStatus() {
        return new Promise(async (resolve, reject) => { });
    }
    beginEscrow() {
        return new Promise(async (resolve, reject) => { });
    }
    billHold() {
        return new Promise(async (resolve, reject) => { });
    }
    billStack() {
        return new Promise(async (resolve, reject) => { });
    }
    billReturn() {
        return new Promise(async (resolve, reject) => { });
    }
    endEscrow() {
        return new Promise(async (resolve, reject) => { });
    }
    /* ----------------------------------------------------------------------- */
    execute(command, params = [], timeout = 1000) {
        return new Promise(async (resolve, reject) => { });
    }
    asyncOnce(event, timeout = 1000) {
        return new Promise(async (resolve, reject) => { });
    }
    startTimer() { }
    /* ----------------------------------------------------------------------- */
    onTick() { }
    onStatus(status) { }
    onSerialPortOpen() { }
    onSerialPortError(error) { }
    onSerialPortClose() { }
}
exports.Device = Device;
/* End of file Device.ts */ 
