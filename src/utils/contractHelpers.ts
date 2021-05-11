import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import web3NoAccount from './web3';

// Addresses
import { getChefAddress, getLpTokenAddress } from './addressHelpers';

// ABI
import chefAbi from '../abis/BurnMachineV2.json';
import lpTokenAbi from '../abis/LPToken.json';

const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount;
  return new _web3.eth.Contract((abi as unknown) as AbiItem, address);
};

export const getChefContract = (web3?: Web3) => {
  return getContract(chefAbi, getChefAddress(), web3);
};

export const getLPContract = (address, web3?: Web3) => {
  return getContract(lpTokenAbi, address, web3);
};
