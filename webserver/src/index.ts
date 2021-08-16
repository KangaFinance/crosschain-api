import express from "express";

const app = express();

app.use(express.json());

var bridge = require('../src/bridge.js');
var viper = require('../src/viper.ts');
var kanga = require('../src/kanga.ts');
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