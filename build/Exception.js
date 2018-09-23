"use strict";
/**
 * Exception.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class Exception
 *
 * Custom error wrapper.
 *
 * @version 1.0.0
 */
class Exception extends Error {
    /* ----------------------------------------------------------------------- */
    /**
     * Exception constructor.
     *
     * @param code Number error code.
     * @param message Text error message.
     */
    constructor(code, message) {
        super(message);
        /**
         * Number error code.
         */
        this.code = 0;
        this.code = code;
        this.message = message;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.Exception = Exception;
/* End of file Exception.ts */ 
