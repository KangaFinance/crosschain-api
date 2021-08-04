module.exports.OperationCall = async function(approveTxnHash, lockTxnHash, oneAddress, ethAddress, amount) {
  await operationCall(approveTxnHash, lockTxnHash, oneAddress, ethAddress, amount);
}

const { BridgeSDK, TOKEN, EXCHANGE_MODE, NETWORK_TYPE, ACTION_TYPE } = require('bridge-sdk');
const configs = require('bridge-sdk/lib/configs');

const operationCall = async (approveTxnHash, lockTxnHash, oneAddress, ethAddress, amount) => {
  try {
    const bridgeSDK = new BridgeSDK({ logLevel: 2 });
    await bridgeSDK.init(configs.testnet);
    const operation = await bridgeSDK.createOperation({
      type: EXCHANGE_MODE.ETH_TO_ONE,
      token: TOKEN.BUSD,
      network: NETWORK_TYPE.ETHEREUM, // NETWORK_TYPE.BINANCE
      amount: amount,
      oneAddress: oneAddress,
      ethAddress: ethAddress,
    });

    await operation.confirmAction({
      actionType: ACTION_TYPE.approveEthManger,
      transactionHash: approveTxnHash,
    });

    await operation.confirmAction({
      actionType: ACTION_TYPE.lockToken,
      transactionHash: lockTxnHash,
    });
  } catch (e) {
    console.error("Error: ", e.message, e.response?.body);
  }
}

