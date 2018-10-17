/**
 * BillInfo.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */

 /**
  * Class BillInfo
  * 
  * Defines the parameters of a supported bill.
  * 
  * @version 1.0.0
  */
export class BillInfo {

  /**
   * Denomination.
   */
  public amount: number = 0;

  /**
   * Country code.
   */
  public code: string = '';

  /**
   * Security level.
   */
  public security: boolean = false;

  /**
   * Allowed to receive.
   */
  public enabled: boolean = false;

  /**
   * Bill constructor.
   * 
   * @param data Raw data from the device.
   */
  public constructor (data?: Buffer) {
    if (data) {
      this.amount = data[0] * Math.pow(10, data[4]);
      this.code = data.toString('ascii', 1, 4).trim();
      
      /* Clear not used item. */
      if (this.code == "\u0000\u0000\u0000") {
        this.code = '';
      }
    }
  }

}

/* End of file BillInfo.ts */