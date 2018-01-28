/**
 * bv-full.js
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2018 Desionlab
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

/*  */
const { CCNet } = require('./../../Source');

/*  */
let device = new CCNet.BillValidator('COM6');

/*  */
let counter = 0;

/*  */
async function init () {
  /*  */
  device.on('status', function (status) {
    //console.log('on:status', status);
  });
  
  /* ----------------------------------------------------------------------- */

  /*  */
  device.on('power-up', function () {
    console.log('on:power-up');
  });

  /*  */
  device.on('power-up-with-bill', function () {
    console.log('on:power-up-with-bill');
  });

  /*  */
  device.on('power-up-with-bill-in-stacker', function () {
    console.log('on:power-up-with-bill-in-stacker');
  });

  /* ----------------------------------------------------------------------- */

  /*  */
  device.on('initialize', function () {
    console.log('on:initialize');
  });

  /*  */
  device.on('disabled', function () {
    console.log('on:disabled');
  });

  /*  */
  device.on('holding', function () {
    console.log('on:holding');
  });

  /* ----------------------------------------------------------------------- */

  /*  */
  device.on('cassette-full', function () {
    console.log('on:cassette-full');
  });

  /*  */
  device.on('cassette-out-of-position', function () {
    console.log('on:cassette-out-of-position');
  });

  /* ----------------------------------------------------------------------- */

  /*  */
  device.on('jammed', function () {
    console.log('on:jammed');
  });

  /*  */
  device.on('cassette-jammed', function () {
    console.log('on:cassette-jammed');
  });

  /*  */
  device.on('cheated', function () {
    console.log('on:cheated');
  });

  /*  */
  device.on('pause', function () {
    console.log('on:pause');
  });

  /* ----------------------------------------------------------------------- */

  /*  */
  device.on('idling', async function () {
    /*  */
    console.log('on:idling');

    /*  */
    if (counter >= 2) {
      await device.end();

      setTimeout(async function () {
        counter = 0;
        await device.begin();
      }, (60 * 1000) * 5);
    }
  });

  /*  */
  device.on('accepting', function () {
    console.log('on:accepting');
  });

  /*  */
  device.on('escrow', async function (bill) {
    /*  */
    console.log('on:escrow:', bill);

    if (bill.amount == 50) {
      /*  */
      await device.retrieve();
    } else {
      /*  */
      await device.stack();

      /*  */
      counter++;
    }
  });

  /*  */
  device.on('stacking', function () {
    console.log('on:stacking');
  });

  /*  */
  device.on('stacked', function (bill) {
    console.log('on:stacked:', bill);
  });

  /*  */
  device.on('returning', function () {
    console.log('on:returning');
  });

  /*  */
  device.on('returned', function (bill) {
    console.log('on:returned:', bill);
  });

  /* ----------------------------------------------------------------------- */

  /*  */
  await device.connect();

  /* ----------------------------------------------------------------------- */

  console.log(device.info);
  console.log(device.billTable);

  /* ----------------------------------------------------------------------- */

  /*  */
  //await device.begin();

  /*  */
  //await device.close();
}

init()
.then(function () {
  console.log('Ok.');
})
.catch(function (error) {
  console.error(error);
});

/* End of file bv-full.js */