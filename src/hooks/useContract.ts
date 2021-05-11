import { useMemo } from 'react';
import useWeb3 from './useWeb3';
import { getLPContract, getChefContract } from '../utils/contractHelpers';

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useChefContract = () => {
  const web3 = useWeb3();
  return useMemo(() => getChefContract(web3), [web3]);
};

export const useLPContract = (address: string) => {
  const web3 = useWeb3();
  return useMemo(() => getLPContract(address, web3), [web3]);
};
