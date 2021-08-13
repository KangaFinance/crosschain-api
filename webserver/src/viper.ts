const Token = require('@venomswap/sdk').Token
const TokenAmount = require('@venomswap/sdk').TokenAmount
const ChainId = require('@venomswap/sdk').ChainId
const Pair = require('@venomswap/sdk').Pair
const Route = require('@venomswap/sdk').Route
const Trade = require('@venomswap/sdk').Trade
const TradeType = require('@venomswap/sdk').TradeType
const ETHER = require('@venomswap/sdk').ETHER
const WETH = require('@venomswap/sdk').WETH
const HARMONY = require('@venomswap/sdk').HARMONY
const JSBI = require('jsbi')
const CurrencyAmount = require('@venomswap/sdk').CurrencyAmount
const Percent = require('@venomswap/sdk').Percent
const currencyEquals = require('@venomswap/sdk').currencyEquals

const Web3 = require('web3');

module.exports.ExactInputTrade = async function() {
    await exactInputTrade();
  }

// function toHex(Amount) {
//     return `0x${Amount.raw.toString(16)}`;
// }

const exactInputTrade = async () => {
    
    //const HARMONY_MAINNET_BSCBUSD = new Token(ChainId.HARMONY_TESTNET, '0x0ab43550a6915f9f67d0c454c2e90385e6497eaa', 18, 'bscBUSD', 'BUSD Token')
    //const HARMONY_MAINNET_BUSD = new Token(ChainId.HARMONY_TESTNET, '0xE176EBE47d621b984a73036B9DA5d834411ef734', 18, 'BUSD', 'Binance USD')

    const HARMONY_TESTNET_WONE = new Token(ChainId.HARMONY_TESTNET, '0x7466d7d0C21Fa05F32F5a0Fa27e12bdC06348Ce2', 18, 'WONE', 'Wrapped ONE')
    const HARMONY_TESTNET_1BUSD = new Token(ChainId.HARMONY_TESTNET, '0x0E80905676226159cC3FF62B1876C907C91F7395', 18, '1BUSD', 'OneBUSD')
    

    // note that you may want/need to handle this async code differently,
    // for example if top-level await is not an option

    try {
        
        const pair = new Pair(new TokenAmount(HARMONY_TESTNET_WONE, JSBI.BigInt(1000)), new TokenAmount(HARMONY_TESTNET_1BUSD, JSBI.BigInt(1000)))
        const route = new Route([pair], HARMONY_TESTNET_1BUSD)
        
        const amount = new TokenAmount(HARMONY_TESTNET_1BUSD, JSBI.BigInt(100))

        const trade = new Trade(
            route,
            amount,
            TradeType.EXACT_INPUT
        )
        console.log(trade)

        //   const web3 = new Web3(
        //     new Web3.providers.HttpProvider(process.env.HARMONY_NODE_URL)
        //   );

        //   const gas = await web3.eth.getGasPrice();

        //   const slippageTolerance = new Percent('1', '100');
        //   const amountOutMin = toHex(trade.minimumAmountOut(slippageTolerance));
        //   const path = [HARMONY_MAINNET_BSCBUSD, HARMONY_MAINNET_BUSD];
        //   const to = 'PK_HERE';
        //   const deadline = Math.floor(Date.now()/1000) + 60*20;
        //   const value = toHex(trade.inputAmount);
          
        //   let account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
        //   web3.eth.accounts.wallet.add(account);
        //   web3.eth.defaultAccount = account.address;

        //   const viperjson = require("????");
        //   const viperswap = new web3.eth.Contract(
        //         viperjson.abi,
        //         process.env.VIPER_SWAP_CONTRACT
        //  );
          
        //   const tx = await viperswap.swap(    //???
        //       amountOutMin,
        //       path,
        //       to,
        //       deadline,
        //       {value, gasPrice: gas}
        //   );     

        // console.log(Trade.bestTradeExactIn([], new TokenAmount(HARMONY_MAINNET_BSCBUSD, 101), HARMONY_MAINNET_BUSD))
    }
    catch (e) {
        console.error("Error: ", e.message);
      }

    
}


