/**
 * index.spec.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2018 Desionlab
 * @license   MIT
 */

import { expect } from 'chai';
import * as CashCode from './../../src';

describe("CashCode BV", () => {

  describe('Const', () => {

    it("CCNet", () => {
      expect(CashCode.CCNet.SYNC).to.equal(2);
      expect(CashCode.CCNet.CRC_POLY).to.equal(33800);
      expect(CashCode.CCNet.ADR_BILL_TO_BILL).to.equal(1);
      expect(CashCode.CCNet.ADR_COIN_CHANGER).to.equal(2);
      expect(CashCode.CCNet.ADR_BILL_VALIDATOR).to.equal(3);
      expect(CashCode.CCNet.ADR_CARD_READER).to.equal(4);
    });

  });

});

/* End of file index.spec.ts */