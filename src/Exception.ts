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
export class Exception extends Error {

  /**
   * Number error code.
   */
  public code: number = 0;

  /* ----------------------------------------------------------------------- */

  /**
   * Exception constructor.
   * 
   * @param code Number error code.
   * @param message Text error message.
   */
  public constructor (code: number, message: string) {
    super(message);

    this.code = code;
    this.message = message;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }

}

/* End of file Exception.ts */