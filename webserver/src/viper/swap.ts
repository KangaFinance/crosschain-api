import { ethers } from 'ethers'
import { getRouterContract, getTokenContract } from "./contracts"

const ChainId = require('@venomswap/sdk').ChainId
const chainId =  ChainId.HARMONY_TESTNET
const destinationAddress = '0x9Cf3000a2f555607Ce330Bf70B0f67c7cBcd3be8'
const dryRun = false
const deadline = 1000
//const privatekey = 
//const wallet = ethers.wallet()


async function swapForToken(wallet: ethers.Wallet, fromToken: string, toToken: string, destinationAddress?: string) {
    destinationAddress = destinationAddress ? destinationAddress : wallet.address
  
    const router = getRouterContract(chainId, wallet)
    const fromTokenContract = getTokenContract(chainId, fromToken, wallet)
    const toTokenContract = getTokenContract(chainId, toToken, wallet)
  
    if (router && fromTokenContract && toTokenContract) {
      const fromTokenSymbol = await fromTokenContract.symbol()
      const toTokenSymbol = await toTokenContract.symbol()
      console.log(`Checking ${fromTokenSymbol} balance for ${wallet.address} ...`)
      const tokenBalance = await fromTokenContract.balanceOf(wallet.address)
  
      if (!tokenBalance.isZero()) {
        await setAllowance(fromTokenContract, wallet, router.address)
  
        const amounts = await router.getAmountsOut(tokenBalance, [fromTokenContract.address, toTokenContract.address])
        const [_, targetAmount] = amounts
  
        const adjustedTargetAmount = targetAmount.sub(targetAmount.div(100))
        const swapMethod = 'swapExactTokensForTokens'
  
        const message = `${ethers.utils.formatEther(
          tokenBalance
        )} ${fromTokenSymbol} to a minimum of ${ethers.utils.formatEther(adjustedTargetAmount)} ${toTokenSymbol}`
  
        console.log(`Swap method: ${swapMethod}`)
        console.log(`Swapping ${message}`)
        console.log(`Output token address: ${toTokenContract.address}`)
        console.log(`Wallet address: ${wallet.address}`)
        console.log(`Destination address: ${destinationAddress}`)
        console.log(`Deadline (ms): ${deadline}`)
  
        if (!dryRun) {
          const tx = await router[swapMethod](
            tokenBalance,
            adjustedTargetAmount,
            [fromTokenContract.address, toTokenContract.address],
            destinationAddress,
            deadline
          )
  
          const receipt = await tx.wait()
          const success = receipt && receipt.status === 1
          console.log(
            `Swapped ${message} - Transaction receipt - tx hash: ${receipt.transactionHash}, success: ${success}\n`
          )
        } else {
          console.log('Not swapping due to running in dry run mode')
        }
      }
    } else {
      console.log(`Couldn't find fromToken ${fromToken} or toToken ${toToken}`)
    }
  }