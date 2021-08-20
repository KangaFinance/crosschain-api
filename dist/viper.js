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
const ChainId = require('@venomswap/sdk').ChainId;
const formatEther = require('ethers').utils.formatEther;
const parseEther = require('ethers').utils.parseEther;
const math = require('mathjs');
var contracts = require('./contracts.js');
module.exports.swapForToken = function (amount, wallet, fromToken, toToken, destinationAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        yield swapForToken(amount, wallet, fromToken, toToken, destinationAddress);
    });
};
module.exports.checkBalance = function (wallet, fromToken, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield checkBalance(wallet, fromToken, amount);
    });
};
const setAllowance = function (fromTokenContract, amount, router) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fromTokenContract.approve(router.address, amount);
    });
};
const checkBalance = function (wallet, fromToken, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fromTokenContract = contracts.getTokenContract(ChainId.HARMONY_TESTNET, fromToken, wallet);
            const fromTokenSymbol = yield fromTokenContract.symbol();
            console.log(`Checking ${fromTokenSymbol} balance for ${wallet.address} ...`);
            const tokenBalance = yield fromTokenContract.balanceOf(wallet.address);
            return math.compare(tokenBalance._hex, parseEther(amount)._hex);
        }
        catch (e) {
            console.error("Error: ", e.message, e);
        }
    });
};
const swapForToken = function (amount, wallet, fromToken, toToken, destinationAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        destinationAddress = destinationAddress ? destinationAddress : wallet.address;
        const parsedAmount = parseEther(amount);
        let dryRun = false;
        const deadline = Date.now() + 1000 * 60 * 3;
        const router = contracts.getRouterContract(ChainId.HARMONY_TESTNET, wallet);
        const fromTokenContract = yield contracts.getTokenContract(ChainId.HARMONY_TESTNET, fromToken, wallet);
        const toTokenContract = contracts.getTokenContract(ChainId.HARMONY_TESTNET, toToken, wallet);
        if (router && fromTokenContract && toTokenContract) {
            try {
                const fromTokenSymbol = yield fromTokenContract.symbol();
                const toTokenSymbol = yield toTokenContract.symbol();
                console.log(`Checking ${fromTokenSymbol} balance for ${wallet.address} ...`);
                const tokenBalance = yield fromTokenContract.balanceOf(wallet.address);
                if (!tokenBalance.isZero()) {
                    yield setAllowance(fromTokenContract, tokenBalance, router);
                    const amounts = yield router.getAmountsOut(parsedAmount, [fromTokenContract.address, toTokenContract.address]);
                    const [_, targetAmount] = amounts;
                    const adjustedTargetAmount = targetAmount.sub(targetAmount.div(100));
                    const swapMethod = 'swapExactTokensForTokens';
                    const message = `${formatEther(parsedAmount)} ${fromTokenSymbol} to a minimum of ${formatEther(adjustedTargetAmount)} ${toTokenSymbol}`;
                    console.log(`Swap method: ${swapMethod}`);
                    console.log(`Swapping ${message}`);
                    console.log(`Output token address: ${toTokenContract.address}`);
                    console.log(`Input token address: ${fromTokenContract.address}`);
                    console.log(`Wallet address: ${wallet.address}`);
                    console.log(`Destination address: ${destinationAddress}`);
                    console.log(`Deadline (ms): ${deadline}`);
                    if (!dryRun) {
                        const tx = yield router[swapMethod](parsedAmount, adjustedTargetAmount, [fromTokenContract.address, toTokenContract.address], destinationAddress, deadline, {
                            gasLimit: 50000000
                        });
                        const receipt = yield tx.wait();
                        const success = receipt && receipt.status === 1;
                        console.log(`Swapped ${message} - Transaction receipt - tx hash: ${receipt.transactionHash}, success: ${success}\n`);
                    }
                    else {
                        console.log('Not swapping due to running in dry run mode');
                    }
                }
            }
            catch (e) {
                console.error("Error: ", e.message, e);
            }
        }
        else {
            console.log(`Couldn't find fromToken ${fromToken} or toToken ${toToken}`);
        }
    });
};
//# sourceMappingURL=viper.js.map