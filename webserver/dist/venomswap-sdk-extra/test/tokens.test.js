"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sdk_1 = require("@venomswap/sdk");
var src_1 = require("../src/");
describe('Tokens', function () {
    describe('Without specifying a chain id', function () {
        it('can correctly parse tokens from token lists', function () {
            var tokens = new src_1.Tokens().tokens;
            expect(tokens === null || tokens === void 0 ? void 0 : tokens.length).toBeGreaterThan(0);
        });
        it('can correctly parse token details', function () {
            var tokens = new src_1.Tokens().tokens;
            var token = tokens === null || tokens === void 0 ? void 0 : tokens[0];
            expect(token).toBeInstanceOf(sdk_1.Token);
            expect(token === null || token === void 0 ? void 0 : token.name).toEqual('Cardano Token');
            expect(token === null || token === void 0 ? void 0 : token.symbol).toEqual('ADA');
            expect(token === null || token === void 0 ? void 0 : token.decimals).toEqual(18);
            expect(token === null || token === void 0 ? void 0 : token.chainId).toEqual(sdk_1.ChainId.BSC_MAINNET);
            expect(token === null || token === void 0 ? void 0 : token.address).toEqual('0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47');
        });
        it('can correctly find a token by its symbol', function () {
            var token = new src_1.Tokens().firstBySymbol('LINK');
            expect(token).toBeInstanceOf(sdk_1.Token);
            expect(token === null || token === void 0 ? void 0 : token.name).toEqual('ChainLink Token');
            expect(token === null || token === void 0 ? void 0 : token.symbol).toEqual('LINK');
            expect(token === null || token === void 0 ? void 0 : token.decimals).toEqual(18);
            expect(token === null || token === void 0 ? void 0 : token.chainId).toEqual(sdk_1.ChainId.BSC_MAINNET);
            expect(token === null || token === void 0 ? void 0 : token.address).toEqual('0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD');
        });
        it('can correctly find all tokens matching a specific symbol', function () {
            var busdTokens = new src_1.Tokens().bySymbol('BUSD');
            expect(busdTokens).toBeInstanceOf(Array);
            expect(busdTokens).toHaveLength(3);
        });
    });
    describe.only('Specifying a chain id', function () {
        it('can correctly parse tokens from token lists with a specified chain id', function () {
            var tokens = new src_1.Tokens(sdk_1.ChainId.HARMONY_MAINNET).tokens;
            expect(tokens === null || tokens === void 0 ? void 0 : tokens.length).toBeGreaterThan(0);
        });
        it('can correctly parse token details', function () {
            var tokens = new src_1.Tokens(sdk_1.ChainId.HARMONY_MAINNET).tokens;
            var token = tokens === null || tokens === void 0 ? void 0 : tokens[0];
            expect(token).toBeInstanceOf(sdk_1.Token);
            expect(token === null || token === void 0 ? void 0 : token.name).toEqual('1INCH Token');
            expect(token === null || token === void 0 ? void 0 : token.symbol).toEqual('11INCH');
            expect(token === null || token === void 0 ? void 0 : token.decimals).toEqual(18);
            expect(token === null || token === void 0 ? void 0 : token.chainId).toEqual(sdk_1.ChainId.HARMONY_MAINNET);
            expect(token === null || token === void 0 ? void 0 : token.address).toEqual('0x58f1b044d8308812881a1433d9Bbeff99975e70C');
        });
        it('can correctly find a token by its symbol', function () {
            var token = new src_1.Tokens(sdk_1.ChainId.HARMONY_MAINNET).firstBySymbol('LINK');
            expect(token).toBeInstanceOf(sdk_1.Token);
            expect(token === null || token === void 0 ? void 0 : token.name).toEqual('ChainLink Token');
            expect(token === null || token === void 0 ? void 0 : token.symbol).toEqual('LINK');
            expect(token === null || token === void 0 ? void 0 : token.decimals).toEqual(18);
            expect(token === null || token === void 0 ? void 0 : token.chainId).toEqual(sdk_1.ChainId.HARMONY_MAINNET);
            expect(token === null || token === void 0 ? void 0 : token.address).toEqual('0x218532a12a389a4a92fC0C5Fb22901D1c19198aA');
        });
        it('correctly only identifies one instance of a token per chain id', function () {
            var busdTokens = new src_1.Tokens(sdk_1.ChainId.HARMONY_MAINNET).bySymbol('BUSD');
            expect(busdTokens).toBeInstanceOf(Array);
            expect(busdTokens).toHaveLength(1);
        });
    });
    describe('Using TOKENS constant', function () {
        it('can correctly parse tokens from token lists with a specified chain id', function () {
            var tokens = src_1.TOKENS[sdk_1.ChainId.HARMONY_MAINNET].tokens;
            expect(tokens === null || tokens === void 0 ? void 0 : tokens.length).toBeGreaterThan(0);
        });
        it('can correctly parse token details', function () {
            var tokens = src_1.TOKENS[sdk_1.ChainId.HARMONY_MAINNET].tokens;
            var token = tokens === null || tokens === void 0 ? void 0 : tokens[0];
            expect(token).toBeInstanceOf(sdk_1.Token);
            expect(token === null || token === void 0 ? void 0 : token.name).toEqual('1INCH Token');
            expect(token === null || token === void 0 ? void 0 : token.symbol).toEqual('11INCH');
            expect(token === null || token === void 0 ? void 0 : token.decimals).toEqual(18);
            expect(token === null || token === void 0 ? void 0 : token.chainId).toEqual(sdk_1.ChainId.HARMONY_MAINNET);
            expect(token === null || token === void 0 ? void 0 : token.address).toEqual('0x58f1b044d8308812881a1433d9Bbeff99975e70C');
        });
        it('can correctly find a token by its symbol', function () {
            var token = src_1.TOKENS[sdk_1.ChainId.HARMONY_MAINNET].firstBySymbol('LINK');
            expect(token).toBeInstanceOf(sdk_1.Token);
            expect(token === null || token === void 0 ? void 0 : token.name).toEqual('ChainLink Token');
            expect(token === null || token === void 0 ? void 0 : token.symbol).toEqual('LINK');
            expect(token === null || token === void 0 ? void 0 : token.decimals).toEqual(18);
            expect(token === null || token === void 0 ? void 0 : token.chainId).toEqual(sdk_1.ChainId.HARMONY_MAINNET);
            expect(token === null || token === void 0 ? void 0 : token.address).toEqual('0x218532a12a389a4a92fC0C5Fb22901D1c19198aA');
        });
        it('correctly only identifies one instance of a token per chain id', function () {
            var busdTokens = src_1.TOKENS[sdk_1.ChainId.HARMONY_MAINNET].bySymbol('BUSD');
            expect(busdTokens).toBeInstanceOf(Array);
            expect(busdTokens).toHaveLength(1);
        });
    });
});
