"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLOCKCHAIN_SETTINGS = exports.BlockchainSettings = exports.Blockchain = void 0;
var sdk_1 = require("@venomswap/sdk");
var lodash_random_1 = __importDefault(require("lodash.random"));
/**
 * Blockchain is an enum representing different blockchains
 */
var Blockchain;
(function (Blockchain) {
    Blockchain[Blockchain["ETHEREUM"] = 1] = "ETHEREUM";
    Blockchain[Blockchain["BINANCE_SMART_CHAIN"] = 2] = "BINANCE_SMART_CHAIN";
    Blockchain[Blockchain["HARMONY"] = 3] = "HARMONY";
})(Blockchain = exports.Blockchain || (exports.Blockchain = {}));
/**
 * BlockchainSettings represents settings for a specific blockchain
 */
var BlockchainSettings = /** @class */ (function () {
    function BlockchainSettings(chainId, blockchain, name, rpcURLs, rpcAPIKey, explorerURL, blockTime) {
        this.chainId = chainId;
        this.rpcAPIKey = rpcAPIKey;
        this.setBlockchain(blockchain);
        this.setName(name);
        this.setRpcURLs(rpcURLs);
        this.setExplorerURL(explorerURL);
        this.setCurrency();
        this.setBlocktime(blockTime);
    }
    BlockchainSettings.prototype.setBlockchain = function (blockchain) {
        if (blockchain) {
            this.blockchain = blockchain;
        }
        else {
            switch (this.chainId) {
                case 56:
                case 97:
                    this.blockchain = Blockchain.BINANCE_SMART_CHAIN;
                    break;
                case 1666600000:
                case 1666700000:
                    this.blockchain = Blockchain.HARMONY;
                    break;
                default:
                    this.blockchain = Blockchain.ETHEREUM;
            }
        }
    };
    BlockchainSettings.prototype.setName = function (name) {
        if (name) {
            this.name = name;
        }
        else {
            switch (this.chainId) {
                case 1:
                    this.name = 'Ethereum Mainnet';
                    break;
                case 3:
                    this.name = 'Ethereum Ropsten';
                    break;
                case 4:
                    this.name = 'Ethereum Rinkeby';
                    break;
                case 5:
                    this.name = 'Ethereum Görli';
                    break;
                case 42:
                    this.name = 'Ethereum Kovan';
                    break;
                case 56:
                    this.name = 'Binance Smart Chain Mainnet';
                    break;
                case 97:
                    this.name = 'Binance Smart Chain Testnet';
                    break;
                case 1666600000:
                    this.name = 'Harmony Mainnet';
                    break;
                case 1666700000:
                    this.name = 'Harmony Testnet';
                    break;
                default:
                    this.name = 'Ethereum Mainnet';
            }
        }
    };
    BlockchainSettings.prototype.setRpcURLs = function (rpcURLs) {
        if (rpcURLs && rpcURLs.length > 0) {
            this.rpcURLs = rpcURLs;
        }
        else {
            switch (this.chainId) {
                case 1:
                    this.rpcURLs = this.rpcAPIKey && this.rpcAPIKey !== '' ? ["https://mainnet.infura.io/v3/" + this.rpcAPIKey] : ['https://mainnet.infura.io/v3/'];
                    break;
                case 3:
                    this.rpcURLs = this.rpcAPIKey && this.rpcAPIKey !== '' ? ["https://ropsten.infura.io/v3/" + this.rpcAPIKey] : ['https://ropsten.infura.io/v3/'];
                    break;
                case 4:
                    this.rpcURLs = this.rpcAPIKey && this.rpcAPIKey !== '' ? ["https://rinkeby.infura.io/v3/" + this.rpcAPIKey] : ['https://rinkeby.infura.io/v3/'];
                    break;
                case 5:
                    this.rpcURLs = this.rpcAPIKey && this.rpcAPIKey !== '' ? ["https://goerli.infura.io/v3/" + this.rpcAPIKey] : ['https://goerli.infura.io/v3/'];
                    break;
                case 42:
                    this.rpcURLs = this.rpcAPIKey && this.rpcAPIKey !== '' ? ["https://kovan.infura.io/v3/" + this.rpcAPIKey] : ['https://kovan.infura.io/v3/'];
                    break;
                case 56:
                    this.rpcURLs = [
                        'https://bsc-dataseed.binance.org/',
                        'https://bsc-dataseed1.defibit.io/',
                        'https://bsc-dataseed1.ninicoin.io/'
                    ];
                    break;
                case 97:
                    this.rpcURLs = [
                        'https://data-seed-prebsc-1-s1.binance.org:8545/',
                        'https://data-seed-prebsc-2-s1.binance.org:8545/',
                        'https://data-seed-prebsc-1-s2.binance.org:8545/'
                    ];
                    break;
                case 1666600000:
                    this.rpcURLs = [
                        'https://api.s0.t.hmny.io/',
                        'https://api.harmony.one/',
                        'https://a.api.s0.t.hmny.io/'
                    ];
                    break;
                case 1666700000:
                    this.rpcURLs = ['https://api.s0.b.hmny.io/'];
                    break;
                default:
                    this.rpcURLs = this.rpcAPIKey && this.rpcAPIKey !== '' ? ["https://mainnet.infura.io/v3/" + this.rpcAPIKey] : ['https://mainnet.infura.io/v3/'];
            }
        }
    };
    BlockchainSettings.prototype.setExplorerURL = function (explorerURL) {
        if (explorerURL && explorerURL !== '') {
            this.explorerURL = explorerURL;
        }
        else {
            switch (this.chainId) {
                case 1:
                    this.explorerURL = 'https://etherscan.io/';
                    break;
                case 3:
                    this.explorerURL = 'https://ropsten.etherscan.io/';
                    break;
                case 4:
                    this.explorerURL = 'https://rinkeby.etherscan.io/';
                    break;
                case 5:
                    this.explorerURL = 'https://goerli.etherscan.io/';
                    break;
                case 42:
                    this.explorerURL = 'https://kovan.etherscan.io/';
                    break;
                case 56:
                    this.explorerURL = 'https://bscscan.com/';
                    break;
                case 97:
                    this.explorerURL = 'https://testnet.bscscan.com/';
                    break;
                case 1666600000:
                    this.explorerURL = 'https://explorer.harmony.one/#/';
                    break;
                case 1666700000:
                    this.explorerURL = 'https://explorer.testnet.harmony.one/#/';
                    break;
                default:
                    this.explorerURL = 'https://etherscan.io/';
            }
        }
    };
    BlockchainSettings.prototype.setCurrency = function () {
        switch (this.chainId) {
            case 56:
            case 97:
                this.currency = sdk_1.BINANCE_COIN;
                break;
            case 1666600000:
            case 1666700000:
                this.currency = sdk_1.HARMONY;
                break;
            default:
                this.currency = sdk_1.ETHER;
        }
    };
    BlockchainSettings.prototype.setBlocktime = function (blockTime) {
        if (blockTime) {
            this.blockTime = blockTime;
        }
        else {
            switch (this.chainId) {
                case 56:
                case 97:
                    this.blockTime = 3;
                    break;
                case 1666600000:
                case 1666700000:
                    this.blockTime = 2;
                    break;
                default:
                    this.blockTime = 13;
            }
        }
    };
    BlockchainSettings.prototype.randomRpcURL = function () {
        if (this.rpcURLs === undefined || this.rpcURLs.length === 0)
            return undefined;
        var randomIndex = lodash_random_1.default(0, this.rpcURLs.length - 1);
        return this.rpcURLs[randomIndex];
    };
    BlockchainSettings.prototype.hexChainId = function () {
        var _a;
        return "0x" + ((_a = this.chainId) === null || _a === void 0 ? void 0 : _a.toString(16));
    };
    return BlockchainSettings;
}());
exports.BlockchainSettings = BlockchainSettings;
exports.BLOCKCHAIN_SETTINGS = (_a = {},
    _a[sdk_1.ChainId.MAINNET] = new BlockchainSettings(sdk_1.ChainId.MAINNET),
    _a[sdk_1.ChainId.ROPSTEN] = new BlockchainSettings(sdk_1.ChainId.ROPSTEN),
    _a[sdk_1.ChainId.RINKEBY] = new BlockchainSettings(sdk_1.ChainId.RINKEBY),
    _a[sdk_1.ChainId.GÖRLI] = new BlockchainSettings(sdk_1.ChainId.GÖRLI),
    _a[sdk_1.ChainId.KOVAN] = new BlockchainSettings(sdk_1.ChainId.KOVAN),
    _a[sdk_1.ChainId.BSC_MAINNET] = new BlockchainSettings(sdk_1.ChainId.BSC_MAINNET),
    _a[sdk_1.ChainId.BSC_TESTNET] = new BlockchainSettings(sdk_1.ChainId.BSC_TESTNET),
    _a[sdk_1.ChainId.HARMONY_MAINNET] = new BlockchainSettings(sdk_1.ChainId.HARMONY_MAINNET),
    _a[sdk_1.ChainId.HARMONY_TESTNET] = new BlockchainSettings(sdk_1.ChainId.HARMONY_TESTNET),
    _a);
