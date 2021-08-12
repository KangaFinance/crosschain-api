"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKENS = exports.Tokens = void 0;
var default_token_list_1 = __importDefault(require("@venomswap/default-token-list"));
var community_token_list_1 = __importDefault(require("@venomswap/community-token-list"));
var sdk_1 = require("@venomswap/sdk");
var Tokens = /** @class */ (function () {
    function Tokens(chainId, tokens) {
        if (tokens === void 0) { tokens = __spreadArray(__spreadArray([], default_token_list_1.default.tokens), community_token_list_1.default.tokens); }
        this.chainId = chainId;
        this.rawTokens = tokens;
        this.setTokens();
    }
    Tokens.prototype.setTokens = function () {
        this.tokens = this.convertTokens(this.rawTokens);
        if (this.chainId) {
            this.tokens = this.byChainId();
        }
    };
    Tokens.prototype.all = function () {
        if (!this.tokens || this.tokens.length == 0)
            return undefined;
        return this.tokens;
    };
    Tokens.prototype.byChainId = function () {
        var _this = this;
        if (this.chainId === undefined || this.tokens === undefined)
            return undefined;
        return this.tokens.filter(function (token) { return token.chainId == _this.chainId; });
    };
    Tokens.prototype.byName = function (name) {
        return this.find('name', name);
    };
    Tokens.prototype.bySymbol = function (symbol) {
        return this.find('symbol', symbol);
    };
    Tokens.prototype.byAddress = function (address) {
        return this.find('address', address);
    };
    Tokens.prototype.firstByName = function (name) {
        var _a;
        return (_a = this.find('name', name)) === null || _a === void 0 ? void 0 : _a[0];
    };
    Tokens.prototype.firstBySymbol = function (symbol) {
        var _a;
        return (_a = this.find('symbol', symbol)) === null || _a === void 0 ? void 0 : _a[0];
    };
    Tokens.prototype.firstByAddress = function (address) {
        var _a;
        return (_a = this.find('address', address)) === null || _a === void 0 ? void 0 : _a[0];
    };
    Tokens.prototype.find = function (key, value) {
        if (this.tokens === undefined)
            return undefined;
        switch (key) {
            case 'name':
                return this.tokens.filter(function (token) { var _a; return ((_a = token === null || token === void 0 ? void 0 : token.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == value.toLowerCase(); });
            case 'symbol':
                return this.tokens.filter(function (token) { var _a; return ((_a = token === null || token === void 0 ? void 0 : token.symbol) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == value.toLowerCase(); });
            case 'address':
                return this.tokens.filter(function (token) { var _a; return ((_a = token === null || token === void 0 ? void 0 : token.address) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == value.toLowerCase(); });
            default:
                return this.tokens.filter(function (token) { var _a; return ((_a = token === null || token === void 0 ? void 0 : token.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == value.toLowerCase(); });
        }
    };
    Tokens.prototype.first = function (key, value) {
        var _a;
        return (_a = this.find(key, value)) === null || _a === void 0 ? void 0 : _a[0];
    };
    Tokens.prototype.convertTokens = function (tokens) {
        var sdkTokens = [];
        for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
            var token = tokens_1[_i];
            var sdkToken = this.convertToken(token);
            sdkTokens.push(sdkToken);
        }
        return sdkTokens;
    };
    Tokens.prototype.convertToken = function (token) {
        return new sdk_1.Token(token.chainId, token.address, token.decimals, token.symbol, token.name);
    };
    return Tokens;
}());
exports.Tokens = Tokens;
exports.TOKENS = (_a = {},
    _a[sdk_1.ChainId.MAINNET] = new Tokens(sdk_1.ChainId.MAINNET),
    _a[sdk_1.ChainId.ROPSTEN] = new Tokens(sdk_1.ChainId.ROPSTEN),
    _a[sdk_1.ChainId.RINKEBY] = new Tokens(sdk_1.ChainId.RINKEBY),
    _a[sdk_1.ChainId.GÖRLI] = new Tokens(sdk_1.ChainId.GÖRLI),
    _a[sdk_1.ChainId.KOVAN] = new Tokens(sdk_1.ChainId.KOVAN),
    _a[sdk_1.ChainId.BSC_MAINNET] = new Tokens(sdk_1.ChainId.BSC_MAINNET),
    _a[sdk_1.ChainId.BSC_TESTNET] = new Tokens(sdk_1.ChainId.BSC_TESTNET),
    _a[sdk_1.ChainId.HARMONY_MAINNET] = new Tokens(sdk_1.ChainId.HARMONY_MAINNET),
    _a[sdk_1.ChainId.HARMONY_TESTNET] = new Tokens(sdk_1.ChainId.HARMONY_TESTNET),
    _a);
