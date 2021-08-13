"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.use(express_1.default.json());
var bridge = require('../src/bridge.js');
var viper = require('../src/viper.ts');
var cors = require('cors');
app.use(cors({ origin: true, credentials: true }));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/lp/pair', (req, res) => {
});
app.post('/lp/explore', (req, res) => {
    res.send('Hello Explore!');
});
app.post('/lp/addLiquidity', (req, res) => {
    const oneAddress = req.body.oneAddress;
    const ethAddress = req.body.ethAddress;
    const approveTxnHash = req.body.approveTxnHash;
    const lockTxnHash = req.body.lockTxnHash;
    const amount = req.body.amount;
    bridge.OperationCall(approveTxnHash, lockTxnHash, oneAddress, ethAddress, amount);
    res.send('Hello addLiquidity!');
});
app.get('/lp/removeLiquidity', (req, res) => {
    viper.ExactInputTrade();
    res.send('Hello removeLiquidity!');
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on PORT ${port}`));
//# sourceMappingURL=index.js.map