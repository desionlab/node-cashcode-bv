/**
 * index.spec.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2019 Desionlab
 * @license   MIT
 */

import { expect } from 'chai';
import * as CashCode from './../../src';

describe('CashCode BV', () => {
  describe('Const', () => {
    expect(CashCode.SYNC).to.equal(2);
    expect(CashCode.CRC_POLY).to.equal(33800);
    expect(CashCode.ADR_BILL_TO_BILL).to.equal(1);
    expect(CashCode.ADR_COIN_CHANGER).to.equal(2);
    expect(CashCode.ADR_BILL_VALIDATOR).to.equal(3);
    expect(CashCode.ADR_CARD_READER).to.equal(4);
  });
});
