"use strict";
/**
 * Download.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
/**
 * Class Download
 *
 * Command for transition to download mode.
 *
 * @description CCNet Document 2
 * @version 1.0.0
 */
class Download extends Command_1.Command {
    /**
     * Download constructor.
     */
    constructor() {
        super(0x50);
    }
}
exports.Download = Download;
/* End of file Download.ts */ 
