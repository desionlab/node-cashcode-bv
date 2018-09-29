"use strict";
/**
 * Nak.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
/**
 * Class Nak
 *
 * Command for response was not correctly received.
 *
 * @description CCNet Document 1
 * @version 1.0.0
 */
class Nak extends Command_1.Command {
    /**
     * Nak constructor.
     */
    constructor() {
        super(0xFF);
    }
}
exports.Nak = Nak;
/* End of file Nak.ts */ 
