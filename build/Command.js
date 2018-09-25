"use strict";
/**
 * Command.ts
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
const CCNet = __importStar(require("./Const/CCNet"));
const Utils_1 = require("./Utils");
/**
 * Class Command
 *
 * An class of device command logic.
 *
 * @version 1.0.0
 */
class Command {
    /**
     * Command constructor.
     *
     * @param cmd Device command code.
     */
    constructor(cmd) {
        /**
         * Device command code.
         */
        this.cmd = null;
        this.cmd = cmd;
    }
    request() { }
    /**
     * Processing command response.
     *
     * @param data Data received from the device.
     */
    response(data) { }
    /**
     * Assemble command packet.
     *
     * @param params
     */
    assemble(params = new Buffer(0)) {
        /* Assemble main packet data. */
        let cmd = Buffer.concat([
            /* Header. */
            new Buffer([
                CCNet.SYNC,
                CCNet.ADR_BILL_VALIDATOR
            ]),
            /* Length. */
            new Buffer([
                (params.length + 6)
            ]),
            /* Command. */
            new Buffer([
                this.cmd
            ])
        ]);
        /* Assemble params packet data. */
        if (params.length) {
            cmd = Buffer.concat([
                /* Main packet data. */
                cmd,
                /* Command params. */
                params
            ]);
        }
        /* Assemble full packet data. */
        return Buffer.concat([
            cmd,
            Utils_1.getCRC16(cmd)
        ]);
    }
}
exports.Command = Command;
/* End of file Command.ts */ 
