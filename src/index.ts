import express from "express";
import { ethers } from "ethers";


require('dotenv').config()

const app = express();

app.use(express.json());

var bridge = require('../bridge.js');
var viper = require('../viper.js');
var cors=require('cors');

const { BridgeSDK, TOKEN, EXCHANGE_MODE, NETWORK_TYPE, ACTION_TYPE } = require('bridge-sdk');

app.use(cors({origin:true,credentials: true}));

app.get('/',(req, res) => {
    res.send('Hello World!');
});
app.post('/lp/pair',(req, res) => {
});
app.post('/lp/explore',(req, res) => {
  res.send('Hello Explore!');
});

// ENDPOINTS

app.post('/lp/swap', async(req, res) => {

  const oneAddress = req.body.oneAddress 
  const amount = req.body.amount
  const wallet = req.body.wallet
  
  const result = await bridge.Bridge( './abi/BUSD.json', process.env.ETH_BUSD_CONTRACT,'./abi/BUSDEthManager.json', process.env.ETH_BUSD_MANAGER_CONTRACT, wallet, amount);

  if (result.success == true) {
    console.log("Assets Successfully Bridged");
    const provider = new ethers.providers.JsonRpcProvider(process.env.HARMONY_NODE_URL);
    let wallet = new ethers.Wallet(req.body.wallet, provider);
    const fromToken = process.env.HMY_BUSD_CONTRACT
    const toToken = process.env.HMY_BSCBUSD_CONTRACT
    const destinationAddress = oneAddress

    const interval = setInterval( async function() {
      if (await viper.checkBalance(wallet, fromToken, "1") > -1) {
        clearInterval(interval);
        viper.swapForToken(amount,wallet, fromToken, toToken, destinationAddress)
      }
    }, 5000);
    res.send("Assets Successfully Bridged");
  } else {
    console.log("Assets Bridging Failed");
    res.send("Assets Bridging Failed");
  }

});

app.post('/bridge/busd2bscbusd', async(req, res) => {

  const amount = req.body.amount
  const wallet = req.body.wallet

  const result = await bridge.Bridge(wallet, amount);
  console.log("result", await result);
  res.send("Bridge");

});

app.post('/viper/swap', async(req, res) => {

  const amount = req.body.amount
  const oneAddress = req.body.oneAddress
  const provider = new ethers.providers.JsonRpcProvider(process.env.HARMONY_NODE_URL);

  // Create Wallet
  let wallet = new ethers.Wallet(req.body.wallet, provider);

  const fromToken = process.env.HMY_BUSD_CONTRACT
  const toToken = process.env.HMY_BSCBUSD_CONTRACT
  const destinationAddress = oneAddress

  viper.swapForToken(amount,wallet, fromToken, toToken, destinationAddress)
  
  res.send('Viper Swap');
});

app.post('/viper/balance',(req, res) => {
  //viper.ExactInputTrade();
  // A Web3Provider wraps a standard Web3 provider, which is
  // what Metamask injects as window.ethereum into each page
  const provider = new ethers.providers.JsonRpcProvider(process.env.HARMONY_NODE_URL);

  // Variables
  const account_from = {
    privateKey: process.env.PRIVATE_KEY || '',
  };

  // Create Wallet
  let wallet = new ethers.Wallet(account_from.privateKey, provider);

  // From BUSD 0xc4860463c59d59a9afac9fde35dff9da363e8425
  // To bscBUSD 0x6d307636323688cc3fe618ccba695efc7a94f813

  const fromToken = '0xc4860463c59d59a9afac9fde35dff9da363e8425' // BUSD

  res.send('Balance');

  viper.checkBalance(wallet, fromToken, "1")

});

// Test Endpoints

app.post('/test/bridge', async(req, res) => {

  const amount = req.body.amount
  const wallet = req.body.wallet
  
  // const result = await bridge.Bridge(0,
  //                                     process.env.ETH_NODE_URL,
  //                                     process.env.ETH_GAS_LIMIT,
  //                                     EXCHANGE_MODE.ETH_TO_ONE, 
  //                                     NETWORK_TYPE.ETHEREUM,
  //                                     ACTION_TYPE.approveEthManger,
  //                                     './abi/BUSD.json', 
  //                                     process.env.ETH_BUSD_CONTRACT,
  //                                     './abi/BUSDEthManager.json', 
  //                                     process.env.ETH_BUSD_MANAGER_CONTRACT, 
  //                                     wallet, 
  //                                     amount);
  
  
  const result = await bridge.Bridge(1,
                                      process.env.HARMONY_NODE_URL,
                                      process.env.ETH_GAS_LIMIT,
                                      EXCHANGE_MODE.ONE_TO_ETH, 
                                      NETWORK_TYPE.ETHEREUM, 
                                      ACTION_TYPE.approveHmyManger,
                                      './abi/BUSD.json', 
                                      process.env.HMY_BSCBUSD_CONTRACT,
                                      './abi/BUSDHmyManager.json', 
                                      process.env.HMY_BSCBUSD_MANAGER_CONTRACT, 
                                      wallet, 
                                      amount);
  

  console.log("result", await result);
  res.send("Test Bridge");

});

app.get('/test/viper/swap',(req, res) => {
  
  //viper.ExactInputTrade();
  // A Web3Provider wraps a standard Web3 provider, which is
  // what Metamask injects as window.ethereum into each page
  const provider = new ethers.providers.JsonRpcProvider(process.env.HARMONY_NODE_URL);

  // Variables
  const account_from = {
    privateKey: process.env.PRIVATE_KEY || '',
  };

  // Create Wallet
  let wallet = new ethers.Wallet(account_from.privateKey, provider);

  // From BUSD 0xc4860463c59d59a9afac9fde35dff9da363e8425
  // To bscBUSD 0x6d307636323688cc3fe618ccba695efc7a94f813

  const fromToken = '0xc4860463c59d59a9afac9fde35dff9da363e8425' // BUSD
  const toToken = '0x6d307636323688cc3fe618ccba695efc7a94f813'   // bscBUSD

  const destinationAddress = '0x9E1AD78422Fd571B26D93EeB895f631A67Cd5462'

  viper.swapForToken("1",wallet, fromToken, toToken, destinationAddress)
  
  res.send('Test Viper Swap');
});

app.get('/test/viper/balance',(req, res) => {
  //viper.ExactInputTrade();
  // A Web3Provider wraps a standard Web3 provider, which is
  // what Metamask injects as window.ethereum into each page
  const provider = new ethers.providers.JsonRpcProvider(process.env.HARMONY_NODE_URL);

  // Variables
  const account_from = {
    privateKey: process.env.PRIVATE_KEY || '',
  };

  // Create Wallet
  let wallet = new ethers.Wallet(account_from.privateKey, provider);
  
  // From BUSD 0xc4860463c59d59a9afac9fde35dff9da363e8425
  // To bscBUSD 0x6d307636323688cc3fe618ccba695efc7a94f813

  const fromToken = '0xc4860463c59d59a9afac9fde35dff9da363e8425' // BUSD

  viper.checkBalance(wallet, fromToken, "1")
  res.send('Test Balance');

  

});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));


/*
import express from "express";

const app = express();

app.use(express.json());

var bridge = require('../src/bridge.js');
var viper = require('../src/viper.ts');
//var kanga = require('../src/kanga.ts');
var cors=require('cors');

app.use(cors({origin:true,credentials: true}));

// Hello World
app.get('/',(req, res) => {
    res.send('Hello World!');
});



// Swap Quote single Pool

app.get('/swap/quote/get',(req, res) => {
  viper.ExactInputTrade();
  res.send('Here is your swap quote Get!');

});

app.post('/swap/quote', async (req, res) => {

  //console.log(await viper.ExactInputTradeQuote())
  let trade = await viper.ExactInputTradeQuote();
  // res.send('Here is your swap quote!');
  // console.log(trade)
  res.json(trade);

});

// Swap Quote Multi Pool

// Swap Execute Harmony Only

// Liquidity Provide Harmony Only

// Swap Execute using Bridge

// Liquidity Provisioning using Bridge

// Execute Swap Using Bridge 
// 
app.post('/lp/pair',(req, res) => {
});
app.post('/lp/explore',(req, res) => {
  res.send('Hello Explore!');
});
app.post('/lp/addLiquidity',(req, res) => {

  const oneAddress = req.body.oneAddress 
  const ethAddress = req.body.ethAddress
  const approveTxnHash = req.body.approveTxnHash
  const lockTxnHash = req.body.lockTxnHash
  const amount = req.body.amount

  bridge.OperationCall(approveTxnHash, lockTxnHash, oneAddress, ethAddress, amount);

  res.send('Hello addLiquidity!');
});

app.get('/lp/removeLiquidity',(req, res) => {
  
  viper.ExactInputTrade();
  
  res.send('Hello removeLiquidity!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));
*/