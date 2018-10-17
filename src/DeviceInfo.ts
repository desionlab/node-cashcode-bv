/**
 * DeviceInfo.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */

/**
 * Class DeviceInfo
 * 
 * Implementing methods for working with device information.
 * 
 * @version 1.0.0
 */
export class DeviceInfo {

  /**
   * Device part number.
   */
  public model: string = null;

  /**
   * Device serial number.
   */
  public serial: string = null;

  /**
   * Device asset number.
   */
  public asset: string = null;

  /**
   * CRC 32 of the code.
   */
  public crc: number = 0;

  /**
   * DeviceInfo constructor.
   * 
   * @param info Raw info from the device.
   * @param crc Raw crc from the device.
   */
  public constructor (info: Buffer, crc: Buffer) {
    /* Pars info data. */
    this.model = info.toString('ascii', 0, 15).trim();
    this.serial = info.toString('ascii', 15, 27).trim();
    this.asset = info.toString('hex', 27, 34).trim();

    /* Pars crc data. */
    this.crc = crc.readInt32BE(0);
  }

}

/* End of file DeviceInfo.ts */