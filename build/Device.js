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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const serialport_1 = __importDefault(require("serialport"));
const Commands = __importStar(require("./Commands"));
const Task_1 = require("./Task");
const Parser_1 = require("./Parser");
const events_1 = require("events");
const Exception_1 = require("./Exception");
const Utils_1 = require("./Utils");
const DeviceInfo_1 = require("./DeviceInfo");
const BillInfo_1 = require("./BillInfo");
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
     */
    constructor(port, options, logger) {
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
         * The logger. You can pass electron-log, winston or another logger
         * with the following interface: { info(), debug(), warn(), error() }.
         * Set it to null if you would like to disable a logging feature.
         */
        this.logger = null;
        /* ----------------------------------------------------------------------- */
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
         * Device information.
         */
        this.info = null;
        /**
         * List of supported bills.
         */
        this.billTable = [];
        /**
         * Status code.
         */
        this.status = null;
        /**
         * A flag indicating the current command execution.
         */
        this.busy = false;
        /* ----------------------------------------------------------------------- */
        /**
         * List of pending commands.
         */
        this.queue = [];
        /**
         *
         */
        this.timerMs = 100;
        /**
         * Operating timer.
         */
        this.timerInterval = null;
        /* --------------------------------------------------------------------- */
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
        /* --------------------------------------------------------------------- */
        /* Bind operating timer event. */
        this.on('tick', () => {
            setImmediate(() => {
                this.onTick();
            });
        });
        /*  */
        this.on(String(Const_1.DeviceStatus.UNIT_DISABLED), () => {
            setImmediate(() => {
                this.timerMs = 500;
                this.startTimer();
            });
        });
        /*  */
        this.on(String(Const_1.DeviceStatus.ESCROW_POSITION), () => {
            setImmediate(() => {
                this.timerMs = 100;
                this.startTimer();
            });
        });
        /* --------------------------------------------------------------------- */
        /* Create serialport transport. */
        this.serial = new serialport_1.default(this.port, this.options, null);
        /* Bind serial open event. */
        this.serial.on('open', () => { this.onSerialPortOpen(); });
        /* Bind serial error event. */
        this.serial.on('error', (error) => { this.onSerialPortError(error); });
        /* Bind serial close event. */
        this.serial.on('close', () => { this.onSerialPortClose(); });
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
    /**
     * A flag indicating the current command execution.
     */
    get isBusy() {
        return this.busy;
    }
    /* ----------------------------------------------------------------------- */
    /**
     * Connect to device.
     */
    async connect() {
        try {
            /* Open serial port. */
            await this.open();
            /* Reset device. */
            await this.reset();
            /* Wait device initialize. */
            await this.asyncOnce(String(Const_1.DeviceStatus.INITIALIZE), 1000);
            /* Get main info of the device. */
            await this.getInfo();
            /* Get list of supported bills. */
            await this.getBillTable();
            /* Fire ready connect event. */
            this.emit('connect');
            /*  */
            return true;
        }
        catch (error) {
            /* Disconnect from device. */
            await this.disconnect();
            /*  */
            throw error;
        }
    }
    /**
     * Disconnect from device.
     */
    async disconnect() {
        try {
            await this.close();
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Reset the device to its original state.
     */
    async reset() {
        return await this.execute((new Commands.Reset()));
    }
    /**
     * Get main info of the device.
     */
    async getInfo() {
        if (!this.info) {
            this.info = new DeviceInfo_1.DeviceInfo(await this.execute((new Commands.Identification())), await this.execute((new Commands.GetCRC32OfTheCode())));
        }
        return this.info;
    }
    /**
     * Get list of supported bills.
     */
    async getBillTable() {
        if (!this.billTable.length) {
            let data = await this.execute((new Commands.GetBillTable()));
            for (var i = 0; i < 24; i++) {
                let section = data.slice(i * 5, (i * 5 + 5));
                this.billTable.push((new BillInfo_1.BillInfo(section)));
            }
        }
        return this.billTable;
    }
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
     * Execute the specified command.
     *
     * @param command Target command.
     * @param params Execute parameters.
     * @param timeout The maximum time to complete this action.
     */
    execute(command, params = [], timeout = 1000) {
        return new Promise((resolve, reject) => {
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
        return new Promise((resolve, reject) => {
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
    /* ----------------------------------------------------------------------- */
    /**
     * Open serialport.
     */
    open() {
        return new Promise((resolve, reject) => {
            if (this.serial.isOpen) {
                resolve(true);
            }
            else {
                this.serial.open((error) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(true);
                });
            }
        });
    }
    /**
     * Close serialport.
     */
    close() {
        return new Promise((resolve, reject) => {
            if (this.serial.isOpen) {
                this.serial.close((error) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(true);
                });
            }
            else {
                resolve(true);
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
    /* ----------------------------------------------------------------------- */
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
        clearInterval(this.timerInterval);
    }
    /**
     * On serial close event.
     */
    onSerialPortClose() {
        /* Stop operating timer. */
        clearInterval(this.timerInterval);
    }
    /* ----------------------------------------------------------------------- */
    /**
     * All status events handler.
     *
     * @param status Current devise status.
     */
    onStatus(status) {
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
        /*  */
        if (newStatus) {
            if (newStatus !== this.status) {
                /*  */
                this.status = newStatus;
                /*  */
                this.emit('status', this.status, Const_1.DeviceStatusMessage.get(this.status), Const_1.DeviceStatusDescription.get(this.status));
                /*  */
                switch (newStatus) {
                    case Const_1.DeviceStatus.DEVICE_BUSY:
                        break;
                    case Const_1.DeviceStatus.ESCROW_POSITION:
                    case Const_1.DeviceStatus.BILL_STACKED:
                    case Const_1.DeviceStatus.BILL_RETURNED:
                        break;
                    default:
                        /*  */
                        this.emit(String(this.status), Const_1.DeviceStatusMessage.get(this.status), Const_1.DeviceStatusDescription.get(this.status));
                        break;
                }
            }
        }
        else {
            /* Status not recognized. */
        }
    }
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
                    if (this.logger) {
                        this.logger.debug('Receive packet:', response);
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
                if (this.logger) {
                    this.logger.debug('Send packet:', task.data);
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
}
exports.Device = Device;
/* End of file Device.ts */ 
