"use strict";
/**
 * Device.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Commands = __importStar(require("./Commands"));
const Task_1 = require("./Task");
const events_1 = require("events");
const Exception_1 = require("./Exception");
const Utils_1 = require("./Utils");
const Const_1 = require("./Const");
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
    /**
     *
     */
    begin() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(true);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
     *
     */
    hold() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.execute((new Commands.Hold()));
                resolve(true);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
     *
     */
    stack() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.execute((new Commands.Stack()));
                resolve(true);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
     *
     */
    return() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.execute((new Commands.Return()));
                resolve(true);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
     *
     */
    end() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.execute((new Commands.EnableBillTypes()), [0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
                resolve(true);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /* ----------------------------------------------------------------------- */
    /**
     * Execute the specified command.
     *
     * @param command Target command.
     * @param params Execute parameters.
     * @param timeout The maximum time to complete this action.
     */
    execute(command, params = [], timeout = 1000) {
        return new Promise(async (resolve, reject) => {
            let task = new Task_1.Task(command.request(params), (error, data) => {
                if (error) {
                    reject(error);
                }
                resolve(command.response(data));
            }, timeout);
            this.queue.push(task);
        });
    }
    /**
     * Synchronization of internal events with the execution queue.
     *
     * @param event Internal event name.
     * @param timeout Maximum waiting time for an internal event.
     */
    asyncOnce(event, timeout = 1000) {
        return new Promise(async (resolve, reject) => {
            let timeoutCounter = 0;
            let timeoutHandler = () => {
                setImmediate(() => {
                    timeoutCounter += this.timerMs;
                    if (timeoutCounter >= timeout) {
                        this.removeListener(event, handler);
                        this.removeListener('tick', timeoutHandler);
                        reject(new Exception_1.Exception(10, 'Request timeout.'));
                    }
                });
            };
            let handler = () => {
                if (timeout) {
                    this.removeListener('tick', timeoutHandler);
                }
                this.removeListener(event, handler);
                resolve(true);
            };
            this.once(event, handler);
            if (timeout) {
                this.on('tick', timeoutHandler);
            }
        });
    }
    /**
     * Start / Restart operating timer.
     */
    startTimer() {
        /* Clear operating timer. */
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        /* Start operating timer. */
        this.timerInterval = setInterval(() => {
            this.emit('tick');
        }, this.timerMs);
    }
    /**
     * Stop operating timer.
     */
    stopTimer() {
        clearInterval(this.timerInterval);
    }
    /* ----------------------------------------------------------------------- */
    /**
     * Operating timer event.
     */
    onTick() {
        /* Check busy flag. */
        if (!this.busy) {
            let task = this.queue.shift();
            /* Check next task. */
            if (typeof task !== 'undefined' && task instanceof Task_1.Task) {
                /* Update flag. */
                this.busy = true;
                let timeoutCounter = 0;
                /* Timeout timer handler. */
                let timeoutHandler = () => {
                    setImmediate(() => {
                        timeoutCounter += this.timerMs;
                        if (timeoutCounter >= task.timeout) {
                            this.busy = false;
                            this.removeListener('tick', timeoutHandler);
                            task.done(new Exception_1.Exception(10, 'Request timeout.'), null);
                        }
                    });
                };
                /* Receive packet handler. */
                let handler = async (response) => {
                    this.removeListener('tick', timeoutHandler);
                    /* Unbind event. */
                    this.parser.removeListener('data', handler);
                    /* Write debug info. */
                    if (this.logger && this.debugPackets) {
                        this.logger.debug('RP:', response);
                    }
                    /* Check CRC */
                    let ln = response.length;
                    let check = response.slice(ln - 2, ln);
                    let slice = response.slice(0, ln - 2);
                    /* Check response CRC. */
                    if (check.toString() !== (Utils_1.getCRC16(slice)).toString()) {
                        /* Send NAK. */
                        await this.serial.write((new Commands.Nak()).request());
                        /* Update flag. */
                        this.busy = false;
                        /* Send event. */
                        task.done(new Exception_1.Exception(11, 'Wrong response data hash.'), null);
                    }
                    /* Get data from packet. */
                    let data = response.slice(3, ln - 2);
                    /* Check response type. */
                    if (data.length == 1 && data[0] == 0x00) {
                        /* Response receive as ACK. */
                    }
                    else if (data.length == 1 && data[0] == 0xFF) {
                        /* Response receive as NAK. */
                        /* Update flag. */
                        this.busy = false;
                        /* Send event. */
                        task.done(new Exception_1.Exception(11, 'Wrong request data hash.'), null);
                    }
                    else {
                        /* Send ACK. */
                        await this.serial.write((new Commands.Ack()).request());
                    }
                    /* Update flag. */
                    this.busy = false;
                    /* Send event. */
                    task.done(null, data);
                };
                /* Bind event. */
                this.parser.once('data', handler);
                /* Write debug info. */
                if (this.logger && this.debugPackets) {
                    this.logger.debug('SP:', task.data);
                }
                /* Send packet. */
                this.serial.write(task.data);
                /* Bind timeout handler. */
                if (task.timeout) {
                    this.on('tick', timeoutHandler);
                }
            }
            else {
                /* Add poll task to queue. */
                this.queue.push(new Task_1.Task((new Commands.Poll()).request(), (error, data) => {
                    if (error) {
                        throw error;
                    }
                    this.onStatus(data);
                }, 1000));
            }
        }
    }
    /**
     * All status events handler.
     *
     * @param status Current devise status.
     */
    onStatus(status) {
        /* New status container. */
        let newStatus = null;
        /* Determine the new status. */
        if (status.length >= 2) {
            switch (parseInt(status[0].toString(10))) {
                case Const_1.DeviceStatus.DEVICE_BUSY:
                case Const_1.DeviceStatus.ESCROW_POSITION:
                case Const_1.DeviceStatus.BILL_STACKED:
                case Const_1.DeviceStatus.BILL_RETURNED:
                    newStatus = parseInt(status[0].toString(10));
                    break;
                default:
                    newStatus = parseInt(status[0].toString(10) + status[1].toString(10));
                    break;
            }
        }
        else {
            newStatus = parseInt(status[0].toString(10));
        }
        /* Check new status. */
        if (newStatus) {
            if (newStatus !== this._status) {
                /* Set new status. */
                this._status = newStatus;
                /* Call a shared event for all device states. */
                this.emit('status', this._status, Const_1.DeviceStatusMessage.get(this._status), Const_1.DeviceStatusDescription.get(this._status));
                /* Event call by type and purpose. */
                switch (newStatus) {
                    case Const_1.DeviceStatus.DEVICE_BUSY:
                        this.emit(String(this._status), parseInt(status[1].toString(10)));
                        break;
                    case Const_1.DeviceStatus.ESCROW_POSITION:
                    case Const_1.DeviceStatus.BILL_STACKED:
                    case Const_1.DeviceStatus.BILL_RETURNED:
                        this.emit(String(this._status), this.billTable[parseInt(status[1].toString(10))]);
                        break;
                    default:
                        this.emit(String(this._status), Const_1.DeviceStatusMessage.get(this._status), Const_1.DeviceStatusDescription.get(this._status));
                        break;
                }
            }
        }
        else {
            /* Status not recognized. */
        }
    }
    /**
     * On serial open event.
     */
    onSerialPortOpen() {
        /* Start operating timer. */
        this.startTimer();
    }
    /**
     * On serial error event.
     *
     * @param error Serialport error object.
     */
    onSerialPortError(error) {
        /* Stop operating timer. */
        this.stopTimer();
    }
    /**
     * On serial close event.
     */
    onSerialPortClose() {
        /* Stop operating timer. */
        this.stopTimer();
    }
}
exports.Device = Device;
/* End of file Device.ts */ 
