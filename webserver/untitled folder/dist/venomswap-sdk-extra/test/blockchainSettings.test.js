"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sdk_1 = require("@venomswap/sdk");
var src_1 = require("../src");
describe('BlockchainSettings', function () {
    it('can correctly determine blockchain settings', function () {
        var _a;
        var settings = src_1.BLOCKCHAIN_SETTINGS[sdk_1.ChainId.HARMONY_MAINNET];
        expect(settings.chainId).toEqual(sdk_1.ChainId.HARMONY_MAINNET);
        expect(settings.hexChainId()).toEqual('0x63564c40');
        expect(settings.blockchain).toEqual(src_1.Blockchain.HARMONY);
        expect(settings.name).toEqual('Harmony Mainnet');
        expect(settings.rpcURLs).toHaveLength(3);
        expect((_a = settings.rpcURLs) === null || _a === void 0 ? void 0 : _a[0]).toEqual('https://api.s0.t.hmny.io/');
        expect(settings.rpcAPIKey).toBeUndefined();
        expect(settings.explorerURL).toEqual('https://explorer.harmony.one/#/');
        expect(settings.blockTime).toEqual(2);
        expect(settings.randomRpcURL()).not.toBeUndefined();
        expect(settings.currency).not.toBeNull();
        expect(settings.currency).toBeInstanceOf(sdk_1.Currency);
        expect(settings.currency).toEqual(sdk_1.HARMONY);
    });
});
