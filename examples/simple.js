/**
 * simple.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2019 Desionlab
 * @license   MIT
 */

const { Device } = require('./../build/');

let counter = 0;
const device = new Device('COM3');

async function init() {
  /* Open port and connect to device. */
  await device.connect();

  /* Show device full info. */
  console.log(device.status);
  console.log(device.info);
  console.log(device.billTable);
  console.log(device.billStatus);

  /* Close port. */
  await device.disconnect();
}

init()
  .then(() => {
    // tslint:disable-next-line: no-console
    console.log('Ok.');
  })
  .catch(error => {
    /* Close port. */
    device.disconnect();

    // tslint:disable-next-line: no-console
    console.error(error);
  });
