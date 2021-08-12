"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
describe('Blockchain', function () {
    it('has correct blockhain enum values', function () {
        expect(src_1.Blockchain.ETHEREUM).toEqual(1);
        expect(src_1.Blockchain.BINANCE_SMART_CHAIN).toEqual(2);
        expect(src_1.Blockchain.HARMONY).toEqual(3);
    });
});
