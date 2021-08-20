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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ethers_1 = require("ethers");
require('dotenv').config();
const app = express_1.default();
app.use(express_1.default.json());
var bridge = require('../bridge.js');
var viper = require('../viper.js');
var cors = require('cors');
const { BridgeSDK, TOKEN, EXCHANGE_MODE, NETWORK_TYPE, ACTION_TYPE } = require('bridge-sdk');
app.use(cors({ origin: true, credentials: true }));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/lp/pair', (req, res) => {
});
app.post('/lp/explore', (req, res) => {
    res.send('Hello Explore!');
});
app.post('/lp/swap', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const oneAddress = req.body.oneAddress;
    const amount = req.body.amount;
    const wallet = req.body.wallet;
    const result = yield bridge.Bridge('./abi/BUSD.json', process.env.ETH_BUSD_CONTRACT, './abi/BUSDEthManager.json', process.env.ETH_BUSD_MANAGER_CONTRACT, wallet, amount);
    if (result.success == true) {
        console.log("Assets Successfully Bridged");
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(process.env.HARMONY_NODE_URL);
        let wallet = new ethers_1.ethers.Wallet(req.body.wallet, provider);
        const fromToken = process.env.HMY_BUSD_CONTRACT;
        const toToken = process.env.HMY_BSCBUSD_CONTRACT;
        const destinationAddress = oneAddress;
        const interval = setInterval(function () {
            return __awaiter(this, void 0, void 0, function* () {
                if ((yield viper.checkBalance(wallet, fromToken, "1")) > -1) {
                    clearInterval(interval);
                    viper.swapForToken(amount, wallet, fromToken, toToken, destinationAddress);
                }
            });
        }, 5000);
        res.send("Assets Successfully Bridged");
    }
    else {
        console.log("Assets Bridging Failed");
        res.send("Assets Bridging Failed");
    }
}));
app.post('/bridge/busd2bscbusd', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const amount = req.body.amount;
    const wallet = req.body.wallet;
    const result = yield bridge.Bridge(wallet, amount);
    console.log("result", yield result);
    res.send("Bridge");
}));
app.post('/viper/swap', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const amount = req.body.amount;
    const oneAddress = req.body.oneAddress;
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(process.env.HARMONY_NODE_URL);
    let wallet = new ethers_1.ethers.Wallet(req.body.wallet, provider);
    const fromToken = process.env.HMY_BUSD_CONTRACT;
    const toToken = process.env.HMY_BSCBUSD_CONTRACT;
    const destinationAddress = oneAddress;
    viper.swapForToken(amount, wallet, fromToken, toToken, destinationAddress);
    res.send('Viper Swap');
}));
app.post('/viper/balance', (req, res) => {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(process.env.HARMONY_NODE_URL);
    const account_from = {
        privateKey: process.env.PRIVATE_KEY || '',
    };
    let wallet = new ethers_1.ethers.Wallet(account_from.privateKey, provider);
    const fromToken = '0xc4860463c59d59a9afac9fde35dff9da363e8425';
    res.send('Balance');
    viper.checkBalance(wallet, fromToken, "1");
});
app.post('/test/bridge', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const amount = req.body.amount;
    const wallet = req.body.wallet;
    const result = yield bridge.Bridge(1, process.env.HARMONY_NODE_URL, process.env.ETH_GAS_LIMIT, EXCHANGE_MODE.ONE_TO_ETH, NETWORK_TYPE.ETHEREUM, ACTION_TYPE.approveHmyManger, './abi/BUSD.json', process.env.HMY_BSCBUSD_CONTRACT, './abi/BUSDHmyManager.json', process.env.HMY_BSCBUSD_MANAGER_CONTRACT, wallet, amount);
    console.log("result", yield result);
    res.send("Test Bridge");
}));
app.get('/test/viper/swap', (req, res) => {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(process.env.HARMONY_NODE_URL);
    const account_from = {
        privateKey: process.env.PRIVATE_KEY || '',
    };
    let wallet = new ethers_1.ethers.Wallet(account_from.privateKey, provider);
    const fromToken = '0xc4860463c59d59a9afac9fde35dff9da363e8425';
    const toToken = '0x6d307636323688cc3fe618ccba695efc7a94f813';
    const destinationAddress = '0x9E1AD78422Fd571B26D93EeB895f631A67Cd5462';
    viper.swapForToken("1", wallet, fromToken, toToken, destinationAddress);
    res.send('Test Viper Swap');
});
app.get('/test/viper/balance', (req, res) => {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(process.env.HARMONY_NODE_URL);
    const account_from = {
        privateKey: process.env.PRIVATE_KEY || '',
    };
    let wallet = new ethers_1.ethers.Wallet(account_from.privateKey, provider);
    const fromToken = '0xc4860463c59d59a9afac9fde35dff9da363e8425';
    viper.checkBalance(wallet, fromToken, "1");
    res.send('Test Balance');
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on PORT ${port}`));
//# sourceMappingURL=index.js.map