"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Token = require('@venomswap/sdk').Token;
const TokenAmount = require('@venomswap/sdk').TokenAmount;
const ChainId = require('@venomswap/sdk').ChainId;
const Pair = require('@venomswap/sdk').Pair;
const Route = require('@venomswap/sdk').Route;
const Trade = require('@venomswap/sdk').Trade;
const TradeType = require('@venomswap/sdk').TradeType;
const ETHER = require('@venomswap/sdk').ETHER;
const WETH = require('@venomswap/sdk').WETH;
const HARMONY = require('@venomswap/sdk').HARMONY;
const JSBI = require('jsbi');
const CurrencyAmount = require('@venomswap/sdk').CurrencyAmount;
const Percent = require('@venomswap/sdk').Percent;
const currencyEquals = require('@venomswap/sdk').currencyEquals;
const Web3 = require('web3');
module.exports.ExactInputTrade = function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield exactInputTrade();
    });
};
const exactInputTrade = () => __awaiter(void 0, void 0, void 0, function* () {
    const HARMONY_TESTNET_WONE = new Token(ChainId.HARMONY_TESTNET, '0x7466d7d0C21Fa05F32F5a0Fa27e12bdC06348Ce2', 18, 'WONE', 'Wrapped ONE');
    const HARMONY_TESTNET_1BUSD = new Token(ChainId.HARMONY_TESTNET, '0x0E80905676226159cC3FF62B1876C907C91F7395', 18, '1BUSD', 'OneBUSD');
    try {
        const pair = new Pair(new TokenAmount(HARMONY_TESTNET_WONE, JSBI.BigInt(1000)), new TokenAmount(HARMONY_TESTNET_1BUSD, JSBI.BigInt(1000)));
        const route = new Route([pair], HARMONY_TESTNET_1BUSD);
        const amount = new TokenAmount(HARMONY_TESTNET_1BUSD, JSBI.BigInt(100));
        const trade = new Trade(route, amount, TradeType.EXACT_INPUT);
        console.log(trade);
    }
    catch (e) {
        console.error("Error: ", e.message);
    }
});
//# sourceMappingURL=viper.js.map