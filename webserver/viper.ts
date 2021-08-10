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

const Web3 = require('web3');

module.exports.ExactInputTrade = async function() {
    await exactInputTrade();
  }

// function toHex(Amount) {
//     return `0x${Amount.raw.toString(16)}`;
// }

const exactInputTrade = async () => {
    
    const HARMONY_MAINNET_BSCBUSD = new Token(ChainId.HARMONY_MAINNET, '0x0ab43550a6915f9f67d0c454c2e90385e6497eaa', 18, 'bscBUSD', 'BUSD Token')
    const HARMONY_MAINNET_BUSD = new Token(ChainId.HARMONY_MAINNET, '0xE176EBE47d621b984a73036B9DA5d834411ef734', 18, 'BUSD', 'Binance USD')

    const USDC = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 18, 'USDC', 'USD Coin')
    const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'DAI Stablecoin')

    // note that you may want/need to handle this async code differently,
    // for example if top-level await is not an option

    try {
        //console.log(Pair.getAddress(HARMONY_MAINNET_BSCBUSD, HARMONY_MAINNET_BUSD))
        const pair = new Pair(new TokenAmount(HARMONY_MAINNET_BSCBUSD, '100'), new TokenAmount(HARMONY_MAINNET_BUSD, '101'))
        //console.log(pair.priceOf(HARMONY_MAINNET_BSCBUSD))
        //console.log(new Route([pair], HARMONY_MAINNET_BSCBUSD))
        const route = new Route([pair], HARMONY_MAINNET_BSCBUSD)
        
        // const token0 = new Token(ChainId.MAINNET, '0x0000000000000000000000000000000000000001', 18, 't0')
        // const pair_weth_0 = new Pair(
        //     new TokenAmount(WETH[ChainId.MAINNET], JSBI.BigInt(1000)),
        //     new TokenAmount(token0, JSBI.BigInt(1000))
        // )
        
        const trade = new Trade(
            route,
            new TokenAmount(HARMONY_MAINNET_BSCBUSD, '100'),
            TradeType.EXACT_OUTPUT
          )
        console.log(trade.inputAmount.currency)

          
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

        // const trade = new Trade(
        //     new Route([pair], HARMONY_MAINNET_BUSD, ETHER),
        //     new TokenAmount(HARMONY_MAINNET_BUSD, JSBI.BigInt(100)),
        //     TradeType.EXACT_INPUT
        // )

        // console.log(trade)

        //console.log(Trade.bestTradeExactIn([], new TokenAmount(HARMONY_MAINNET_BSCBUSD, JSBI.BigInt(100)), HARMONY_MAINNET_BUSD))
    }
    catch (e) {
        console.error("Error: ", e.message, e.response?.body);
      }

    
}


