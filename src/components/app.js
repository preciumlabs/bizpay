import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { ChainId } from '@sushiswap/sdk';
// import { Client } from '@bandprotocol/bandchain.js';

import ProtectedRoute from './ProtectedRoute';
import AccountModal from './AccountModal';
import WFTMModal from './WFTMModal';
import NotFound from './NotFound';
import PaintBoard from './PaintBoard';
import LandingPage from '../pages/landingpage';
import AboutPage from '../pages/aboutpage';
import ContactUsPage from '../pages/contactuspage';
import HowToUsePage from '../pages/howtousepage';
// import OurServicePage from '../pages/ourservicepage';
import RoadmapPage from '../pages/roadmappage';
import ExplorePage from '../pages/explorepage';
import BrochurePage from '../pages/brochurepage';
import PrivacyPolicyPage from '../pages/privacypolicy';
import PurchaseAgreementPage from '../pages/purchase-agreement';
import TermsOfServicePage from '../pages/termsofservice';
import AccountDetails from '../pages/AccountDetails';
import NFTItem from '../pages/NFTItem';
import CollectionCreate from '../pages/Collection/Create';
import CollectionReview from '../pages/Collection/Review';
import NotificationSetting from '../pages/NotificationSetting';
import PriceActions from 'actions/price.actions';
import BrokerPage from 'pages/brokerpage';
import ValuationPage from 'pages/valuationpage';
import Sell from 'pages/sell';
import QuenAns from 'pages/questionandanswer';
// import NFTSwipe from 'pages/nftswipe';
import Subscription from 'pages/subscription';
import Favourite from 'pages/favourite';
import QnA from 'pages/questionandanswer/children';
import Dox from 'pages/questionandanswer/dox_qna';
import NftSwipes from 'pages/nftswipes/index';
// import NFTSwipe from 'pages/nftswipe';

const App = () => {
  const dispatch = useDispatch();
  const { chainId } = useWeb3React();

  const [priceInterval, setPriceInterval] = useState(null);

  const getPrice = async () => {
    try {
      if (chainId === ChainId.FANTOM) {
        // const endpoint = 'https://rpc.bandchain.org';
        // const client = new Client(endpoint);
        // const resp = await client.getReferenceData(['FTM/USD', 'BTC/USD']);
        // console.log({ resp });
        // dispatch(PriceActions.updatePrice(resp.rate));
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const oracle = new ethers.Contract(
          '0xf4766552D15AE4d256Ad41B6cf2933482B0680dc',
          [
            {
              inputs: [],
              name: 'latestAnswer',
              outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
              stateMutability: 'view',
              type: 'function',
            },
          ],
          provider
        );
        const _price = await oracle.latestAnswer();
        const price = parseFloat(_price.toString()) / 10 ** 8;
        dispatch(PriceActions.updatePrice(price));
      } else if (chainId === ChainId.ROPSTEN) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const oracle = new ethers.Contract(
          '0x14137fA0D2Cf232922840081166a6a05C957bA4c',
          [
            {
              inputs: [],
              name: 'latestAnswer',
              outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
              stateMutability: 'view',
              type: 'function',
            },
          ],
          provider
        );
        const _price = await oracle.latestAnswer();
        const price = parseFloat(_price.toString()) / 10 ** 8;
        dispatch(PriceActions.updatePrice(price));
      } else if (chainId === ChainId.GÖRLI) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const oracle = new ethers.Contract(
          '0x48731cF7e84dc94C5f84577882c14Be11a5B7456',
          [
            {
              inputs: [],
              name: 'latestAnswer',
              outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
              stateMutability: 'view',
              type: 'function',
            },
          ],
          provider
        );
        const _price = await oracle.latestAnswer();
        const price = parseFloat(_price.toString()) / 10 ** 8;
        dispatch(PriceActions.updatePrice(price));
      } else if (chainId === ChainId.MAINNET) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const oracle = new ethers.Contract(
          '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
          [
            {
              inputs: [],
              name: 'latestAnswer',
              outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
              stateMutability: 'view',
              type: 'function',
            },
          ],
          provider
        );
        const _price = await oracle.latestAnswer();
        const price = parseFloat(_price.toString()) / 10 ** 8;
        dispatch(PriceActions.updatePrice(price));
      }
    } catch (err) {
      console.log('here', err);
    }
  };

  useEffect(() => {
    if (priceInterval) {
      clearInterval(priceInterval);
    }

    getPrice();
    setPriceInterval(setInterval(getPrice, 1000 * 10));
  }, [chainId]);

  return (
    <>
      <Router>
        <Switch>
          {/* LandingPage */}
          <Route exact path="/" component={QuenAns} />
          <Route exact path="/Qna" component={QnA} />
          <Route exact path="/dox" component={Dox} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/contactUs" component={ContactUsPage} />
          {/* <Route exact path="/our-service" component={OurServicePage} /> */}
          <Route exact path="/roadmap" component={RoadmapPage} />
          <Route exact path="/how-to-use" component={HowToUsePage} />
          <Route exact path="/explore" component={ExplorePage} />
          <Route exact path="/brochure/:id" component={BrochurePage} />
          <Route exact path="/bizflip-broker" component={BrokerPage} />
          <Route exact path="/get-a-valuation" component={ValuationPage} />
          <Route exact path="/sell/generic" component={Sell} />
          <Route path="/explore/:addr/:id" component={NFTItem} />
          <Route path="/privacy-policy" component={PrivacyPolicyPage} />
          <Route path="/purchase-agreement" component={PurchaseAgreementPage} />
          <Route path="/terms-of-service" component={TermsOfServicePage} />
          <Route path="/question-answer" component={LandingPage} />
          <Route path="/nft-swipe" component={NftSwipes} />
          <Route path="/subscription" component={Subscription} />
          <Route path="/favourite" component={Favourite} />
          <ProtectedRoute exact path="/create" component={PaintBoard} />
          {/* <Route path="/bundle/:bundleID" component={NFTItem} /> */}
          <Route path="/account/:uid" component={AccountDetails} />
          <ProtectedRoute
            path="/collection/create"
            component={() => <CollectionCreate isRegister={false} />}
          />
          <ProtectedRoute
            path="/collection/register"
            component={() => <CollectionCreate isRegister />}
          />
          <ProtectedRoute
            path="/collection/review"
            component={CollectionReview}
          />
          <ProtectedRoute
            path="/settings/notification"
            component={NotificationSetting}
          />
          <Route path="/404" component={NotFound} />
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
        <AccountModal />
        <WFTMModal />
        <Toaster position="bottom-right" reverseOrder={false} />
      </Router>
    </>
  );
};

export default App;
