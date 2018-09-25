/**
 * Command.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */
/// <reference types="node" />
/**
 * Class Command
 *
 * An class of device command logic.
 *
 * @version 1.0.0
 */
export declare class Command {
    /**
     * Device command code.
     */
    protected cmd: number;
    /**
     * Command constructor.
     *
     * @param cmd Device command code.
     */
    constructor(cmd: number);
    request(): void;
    /**
     * Processing command response.
     *
     * @param data Data received from the device.
     */
    response(data: Buffer): any;
    /**
     * Assemble command packet.
     *
     * @param params
     */
    protected assemble(params?: Buffer): Buffer;
}
