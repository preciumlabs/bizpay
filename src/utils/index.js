import { ethers } from 'ethers';
import { getAddress } from '@ethersproject/address';

import { Categories } from 'constants/filter.constants';
import { IPFSUris } from 'constants/ipfs.constants';
import MetamaskErrors from 'constants/errors';
import { format } from 'date-fns';

export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

function isValidCode(code) {
  return code in MetamaskErrors ? true : false;
}

export function shortenAddress(address, chars = 4) {
  if (!address) return '';

  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export const getHigherGWEI = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const price = (await provider.getGasPrice()) * 2;

  return price;
};

export const getRandomIPFS = (tokenURI, justURL = false) => {
  let random = Math.floor(Math.random() * IPFSUris.length);

  if (justURL) {
    return `${IPFSUris[random]}`;
  }

  if (
    // tokenURI.includes('gateway.pinata.cloud') ||
    tokenURI.includes('cloudflare') ||
    tokenURI.includes('ipfs.io') ||
    tokenURI.includes('ipfs.infura.io') ||
    tokenURI.includes('artion')
  ) {
    return `${IPFSUris[random]}${tokenURI.split('ipfs/')[1]}`;
  } else if (tokenURI.includes('ipfs://')) {
    return `${IPFSUris[random]}${tokenURI.split('ipfs://')[1]}`;
  }

  return tokenURI;
};

export const formatNumber = num => {
  if (isNaN(num) || num === null) return 0.0;
  let parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const formatCategory = category => {
  return Categories.find(item => item.id === category).label;
};

export const formatError = error => {
  if (error.data) {
    if (isValidCode(error.data.code)) {
      return MetamaskErrors[String(error.data.code)];
    } else {
      return error.data.message;
    }
  } else {
    if (error.message) {
      let message = error.message;
      let startIndex = message.indexOf('data');

      if (startIndex < 0) {
        if (isValidCode(error.code)) {
          return MetamaskErrors[String(error.code)];
        }
      }

      let code = String(message.substr(startIndex + 14, 6));

      if (isValidCode(code)) {
        return MetamaskErrors[code];
      }
    }
  }

  return 'Error!';
};

const intlFormat = num => {
  return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
};

export const formatFollowers = num => {
  if (num >= 1000000) return intlFormat(num / 1000000) + 'M';
  if (num >= 1000) return intlFormat(num / 1000) + 'k';
  return intlFormat(num);
};

export const calculateGasMargin = value => {
  return value
    .mul(ethers.BigNumber.from(10000).add(ethers.BigNumber.from(1000)))
    .div(ethers.BigNumber.from(10000));
};

export const formatDate = (date, dateFormat = 'yyyy-MMM-dd hh:mm') =>
  format(date, dateFormat);

export const getLastElementBySelector = selector => {
  try {
    let elements = document.querySelectorAll(selector);
    return elements[elements.length - 1];
  } catch (e) {
    return null;
  }
};

export const scrollToElement = element =>
  element?.scrollIntoView?.({ behavior: 'smooth' });
