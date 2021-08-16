import { ethers } from 'ethers'
import { ChainId, ROUTER_ADDRESSES, MASTER_BREEDER_ADDRESSES } from '@venomswap/sdk'
import { abi as ROUTER_ABI } from '@venomswap/periphery/build/IUniswapV2Router02.json'
import { abi as IERC20_ABI } from '@venomswap/periphery/build/IERC20.json'
import { abi as IUNISWAPV2PAIR_ABI } from '@venomswap/periphery/build/IUniswapV2Pair.json'
import { abi as MASTER_BREEDER_ABI } from '@venomswap/contracts/build/MasterBreeder.json'
import { getTokenWithDefault } from './getTokenWithDefault'
//import { isAddress } from './addresses'

export function getRouterContract(
  chainId: ChainId,
  walletOrProvider?: ethers.Wallet | ethers.providers.Provider
): ethers.Contract | undefined {
  const routerAddress = ROUTER_ADDRESSES[chainId]
  if (routerAddress && ethers.utils.isAddress(routerAddress)) {
    return new ethers.Contract(routerAddress, ROUTER_ABI, walletOrProvider)
  }

  return undefined
}

export function getTokenContract(
  chainId: ChainId,
  addressOrSymbol: string,
  walletOrProvider?: ethers.Wallet | ethers.providers.Provider
): ethers.Contract | undefined {
  if (ethers.utils.isAddress(addressOrSymbol)) {
    return new ethers.Contract(addressOrSymbol, IERC20_ABI, walletOrProvider)
  }

  const token = getTokenWithDefault(chainId, addressOrSymbol)
  if (!token) return undefined
  return new ethers.Contract(token.address, IERC20_ABI, walletOrProvider)
}

export function getPairContract(
  pairAddress: string,
  walletOrProvider?: ethers.Wallet | ethers.providers.Provider
): ethers.Contract | undefined {
  if (ethers.utils.isAddress(pairAddress)) {
    return new ethers.Contract(pairAddress, IUNISWAPV2PAIR_ABI, walletOrProvider)
  }

  return undefined
}

export function getMasterBreederContract(
  chainId: ChainId,
  walletOrProvider?: ethers.Wallet | ethers.providers.Provider
): ethers.Contract | undefined {
  const masterBreederAddress = MASTER_BREEDER_ADDRESSES[chainId]
  if (masterBreederAddress && ethers.utils.isAddress(masterBreederAddress)) {
    return new ethers.Contract(masterBreederAddress, MASTER_BREEDER_ABI, walletOrProvider)
  }

  return undefined
}