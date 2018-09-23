/**
 * Exception.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
/**
 * Class Exception
 *
 * Custom error wrapper.
 *
 * @version 1.0.0
 */
export declare class Exception extends Error {
    /**
     * Number error code.
     */
    code: number;
    /**
     * Exception constructor.
     *
     * @param code Number error code.
     * @param message Text error message.
     */
    constructor(code: number, message: string);
}
