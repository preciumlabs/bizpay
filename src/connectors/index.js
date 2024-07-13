import { ChainId } from '@sushiswap/sdk';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

import { NetworkConnector } from './NetworkConnector';

import ARTION_LOGO_URL from '../assets/svgs/logo_blue.svg';

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

const RPC = isMainnet
  ? {
      [ChainId.MAINNET]: 'https://eth.public-rpc.com',
    }
  : {
      [ChainId.GÖRLI]: 'https://goerli.blockpi.network/v1/rpc/public',
    };

const ChainID = isMainnet ? ChainId.MAINNET : ChainId.GÖRLI;

export const network = new NetworkConnector({
  defaultChainId: ChainID,
  urls: RPC,
});

export const injected = new InjectedConnector({
  supportedChainIds: [ChainID],
});

export const walletlink = new WalletLinkConnector({
  url: 'https://eth.public-rpc.com',
  appName: 'Ethereum',
  appLogoUrl: ARTION_LOGO_URL,
});
