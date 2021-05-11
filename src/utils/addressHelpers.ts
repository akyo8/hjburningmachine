import addresses from '../constants/contracts';

export const getAddress = (address: any): string => {
  const mainNetChainId = 56;
  const chainId = process.env.REACT_APP_CHAIN_ID;
  return address[chainId] ? address[chainId] : address[mainNetChainId];
};

export const getChefAddress = () => {
  return getAddress(addresses.chef);
};

export const getLpTokenAddress = () => {
  return getAddress(addresses.lptoken);
};
