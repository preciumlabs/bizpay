import { ChainId } from '@sushiswap/sdk';

import { calculateGasMargin, getHigherGWEI } from 'utils';
import { Contracts } from 'constants/networks';
import useContract from 'hooks/useContract';

import { FACTORY_ABI } from './abi';

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';
const CHAIN = isMainnet ? ChainId.MAINNET : ChainId.GÖRLI;

export const useFactoryContract = () => {
  const { getContract } = useContract();

  const getFactoryContract = async () =>
    await getContract(Contracts[CHAIN].factory, FACTORY_ABI);

  const getPrivateFactoryContract = async () =>
    await getContract(Contracts[CHAIN].privateFactory, FACTORY_ABI);

  const getArtFactoryContract = async () =>
    await getContract(Contracts[CHAIN].artFactory, FACTORY_ABI);

  const getPrivateArtFactoryContract = async () =>
    await getContract(Contracts[CHAIN].privateArtFactory, FACTORY_ABI);

  const createNFTContract = async (contract, name, symbol, value, from) => {
    const args = [name, symbol];

    console.log('contract', contract.address);

    const options = {
      value,
      from,
      gasPrice: getHigherGWEI(),
    };

    console.log('options3', options);
    const gasEstimate = await contract.estimateGas.createNFTContract(
      ...args,
      options
    );
    console.log('options2', options);
    options.gasLimit = calculateGasMargin(gasEstimate);
    console.log('options', options);
    return await contract.createNFTContract(...args, options);
  };

  return {
    getFactoryContract,
    getPrivateFactoryContract,
    getArtFactoryContract,
    getPrivateArtFactoryContract,
    createNFTContract,
  };
};
