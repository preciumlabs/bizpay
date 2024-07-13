import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';

import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { Categories } from 'constants/filter.constants';
import HeaderActions from 'actions/header.actions';
import FilterActions from 'actions/filter.actions';
import Header from 'components/header';
import Footer from 'components/footer';

import styles from './styles.module.scss';
// import { Card } from '@material-ui/core';
import SwipeCard from './swipe';
//import { Card } from '@material-ui/core';
import LearnMore from 'components/LearnMore';

const LandingPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [windowSize] = useState(getWindowSize());

  console.log('windowSize', windowSize);
  useEffect(() => {
    dispatch(HeaderActions.toggleSearchbar(false));
    dispatch(FilterActions.updateCategoryFilter(null));
  }, []);

  const handleViewCategory = id => {
    dispatch(FilterActions.updateCategoryFilter(id === 'all' ? null : id));
    history.push('/explore');
  };

  const renderCategoryCard = (key, icon) => (
    <div
      className={styles.categoryCard}
      key={key}
      onClick={() => handleViewCategory(key)}
    >
      <div className={styles.cardIconWrapper2}>
        <img src={icon} />
      </div>
    </div>
  );

  const onPlayerReady = event => {
    event.target.pauseVideo();
  };

  const opts = {
    height: windowSize.innerWidth > 800 ? 460 : windowSize.innerWidth * 0.8,
    width: windowSize.innerWidth > 800 ? 800 : windowSize.innerWidth,
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <div className={styles.head}>
          <h1>Explore, collect & sell</h1>
          <div className={styles.player_yt}>
            <YouTube
              videoId="tn0aS4VE1Qw"
              opts={opts}
              onReady={onPlayerReady}
            />
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.mainLeft}>
            <div
              className={styles.title}
              style={{ color: '#FFF' }}
            >{`Buy and Sell Profitable Assets on the Blockchain`}</div>

            <div className={styles.ctaGroup}>
              <Link to="/explore" className={styles.exploreButton}>
                Explore
              </Link>

              <Link to="/create" className={styles.createButton}>
                Create
              </Link>
            </div>
          </div>
          <div
            className={styles.card}
            style={{ background: 'transparent', boxShadow: 'none' }}
          >
            <SwipeCard />
          </div>
          <div className={styles.learnMoreArea}>
            <Link to="/about" className={styles.learnMoreButton}>
              <PlayCircleOutlineIcon />
              Learn More about Bizflip
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.about}>
        <div className={styles.aboutInner}>
          <div className={styles.aboutTitle}>Browse by category</div>
          <div className={styles.categories}>
            {Categories.map(cat =>
              renderCategoryCard(cat.id, cat.icon, cat.label, cat.color)
            )}
          </div>
        </div>
      </div>
      <div className={styles.aboutdatamain}>
        <div className={styles.aboutdata}>
          <div
            className={styles.title}
            style={{ color: '#FFF' }}
          >{`We Give You the Power to Buy and Sell Securely, All Within One Marketplace`}</div>
          <br></br>
          <div className={styles.bodyText}>
            <strong>
              As the globalized economy becomes increasingly digital, more and
              more transactions are moving online. This has led to the rise of
              blockchain technology as a way to transparently conduct business.
              For buyers and sellers, this means that there is a new way to
              trade without having to worry about the security or privacy of the
              process.
              <br></br>
              <br></br>
              <br></br>
              Bizflip is at the forefront of the blockchain economy. It’s
              convenient, it’s fast – and it’s also the only all-in-one platform
              you need to exchange goods. In a nutshell, we are the best
              peer-to-peer marketplace for the transfer of profitable assets. We
              are committed to providing an efficient and honest system for our
              users to do business with each other.
              <br></br>
              <br></br>
              <br></br>
              Our goal is to make it simple to trade without third parties,
              saving you time and cash. With Bizflip, you can buy, sell or trade
              any asset, anywhere in the world, safely and transparently.
              <br></br>
              <br></br>
            </strong>
          </div>
          <Link to="/our-service" className={styles.exploreButton}>
            How it Works
          </Link>
        </div>
        <div>
          <LearnMore />
        </div>
      </div>
      <Footer />
    </div>
  );
};

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

export default LandingPage;
