"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(express_1.default.json());
var bridge = require('../bridge.js');
var viper = require('../viper.ts');
var cors = require('cors');
app.use(cors({ origin: true, credentials: true }));
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.post('/lp/pair', function (req, res) {
});
app.post('/lp/explore', function (req, res) {
    res.send('Hello Explore!');
});
app.post('/lp/addLiquidity', function (req, res) {
    var oneAddress = req.body.oneAddress;
    var ethAddress = req.body.ethAddress;
    var approveTxnHash = req.body.approveTxnHash;
    var lockTxnHash = req.body.lockTxnHash;
    var amount = req.body.amount;
    bridge.OperationCall(approveTxnHash, lockTxnHash, oneAddress, ethAddress, amount);
    res.send('Hello addLiquidity!');
});
app.get('/lp/removeLiquidity', function (req, res) {
    viper.ExactInputTrade();
    res.send('Hello removeLiquidity!');
});
var port = process.env.PORT || 3000;
app.listen(port, function () { return console.log("App listening on PORT " + port); });
