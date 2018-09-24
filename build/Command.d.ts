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
 * An abstract class of device command logic.
 *
 * @version 1.0.0
 */
export declare abstract class Command {
    constructor();
    request(): void;
    /**
     * Processing command response.
     *
     * @param data Data received from the device.
     * @returns { any } The processed data are presented in a convenient form.
     */
    response(data: Buffer): void;
    protected assemble(): void;
}
