import Footer from 'components/footer';
import Header from 'components/header';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';
// import data from './data';
// import TinderCard from 'react-tinder-card';
import { IconButton } from '@mui/material';
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import StarRateIcon from '@material-ui/icons/StarRate';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { Link, useLocation } from 'react-router-dom';
import OfferModal from './offermodal';
import Subscription from 'pages/subscription';
import { useApi } from 'api';
import { useWeb3React } from '@web3-react/core';
import ReactCardFlip from 'react-card-flip';
import BackCard from './backCard';
// import { Frame, useMotionValue, useTransform, useAnimation } from 'framer';
// import FlipCameraAndroidSharpIcon from '@mui/icons-material/FlipCameraAndroidSharp';
// import Card from './Card/index';

const FAV_NFT = [];

const NFTSwipe = () => {
  const location = useLocation();
  const que_res = location.aboutProps;
  const likeref = useRef('');
  const noperef = useRef('');
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [id] = useState('');
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { fetchNFTdata, addToLikeNft } = useApi();
  const [data, setData] = useState([]);
  const { account } = useWeb3React();
  const fav = que_res?._types[0]?.value;
  const minValue = que_res?._min;
  const maxValue = que_res?._max;
  // const [isFlipped, setIsFlipped] = useState(false);
  const [count] = useState(0);
  const [Premium] = useState(false);

  useEffect(() => {
    const req = async () => {
      const res = await fetchNFTdata([fav, minValue, maxValue]);
      setData(res.data.map(ele => ({ ...ele, isFlipped: false })));
    };
    req();
  }, []);

  const makeAnOffer = async () => {
    if (account === '' || id === '') return;
    FAV_NFT.push({
      _name: name,
      _url: url,
    });

    await addToLikeNft(account, id);
    handleClose();
    setName('');
    setUrl('');
  };
  const flipref = useRef(null);

  let Time;
  useEffect(() => {
    Time = setTimeout(() => {
      flipref.current.classList.remove(styles.hintFlipCard);
      console.log(flipref.current.classList);
    }, 2500);

    return () => {
      if (Time) clearTimeout(Time);
    };
  }, []);

  // const [clickPoint, setClickPoint] = useState(0);
  const handleClick = (e, index, val) => {
    e.preventDefault();
    // window.addEventListener('click', e => {
    //   console.log(e, 'pageX');
    //   setClickPoint(e.pageX);
    // });
    // window.addEventListener('mousemove', e => {
    //   if (clickPoint - e.pageX === 0) {
    //     setIsFlipped(prevState => !prevState);
    //   } else {
    //     setIsFlipped(prevState => prevState);
    //   }
    // });
    const newData = [
      ...data.slice(0, index - 1),
      { ...data[index], isFlipped: val },
      ...data.slice(index + 1),
    ];
    setData(newData);
    // setIsFlipped(prevState => !prevState);
  };

  return (
    <div className={styles.container}>
      <Header />
      {Premium ? (
        <Subscription />
      ) : (
        <>
          <div className={styles.body}>
            <div className={styles.tinderCards}>
              {data.length > 0 &&
                data.map((character, index) => (
                  <div
                    key={character._id}
                    className={styles.swipe}
                    onMouseDown={e => {
                      e.preventDefault();
                      console.log(e);
                    }}
                    id="swipearea"
                    // preventSwipe={['up', 'down']}
                    // onSwipe={dir =>
                    //   swiped(dir, character.name, character.url, character._id)
                    // }
                    // onCardLeftScreen={() => outOfFrame(character.name)}
                  >
                    <ReactCardFlip
                      isFlipped={character.isFlipped}
                      flipSpeedBackToFront={0.4}
                      // flipDirection="vertical"
                    >
                      <div
                        style={{
                          backgroundImage: `url(${character.imageUrl})`,
                        }}
                        ref={flipref}
                        className={cx(styles.card)}
                        // onClick={handleClick}
                        onMouseUp={e => {
                          e.preventDefault();
                          handleClick(e, index, true);
                        }}
                      >
                        <div className={styles.like} ref={likeref}></div>
                        <div className={styles.nope} ref={noperef}></div>
                        {/* <div
                          className={styles.swipe_button}
                          // onTouchEnd={handleClick}
                          onClick={e => {
                            e.preventDefault();
                            handleClick(index, true);
                          }}
                        >
                          <FlipCameraAndroidSharpIcon />
                        </div> */}
                        <h1 style={{ color: '#fff' }}>{character.name}</h1>
                      </div>
                      {/* <div
                        onClick={handleClick}
                        className={cx(styles.card, styles.back_card)}
                      >
                        <div className={styles.back_name}>
                          Name: {character.name}
                        </div>
                        <div>Type: {character.assetType}</div>
                        <div>Price: {character.price}</div>
                      </div> */}
                      <BackCard
                        count={count}
                        character={character}
                        // setIsFlipped={setIsFlipped}
                        setIsFlipped={e => {
                          e.preventDefault();
                          handleClick(e, index, false);
                        }}
                      />
                    </ReactCardFlip>
                  </div>
                ))}
            </div>
            <div className={styles.reletive}>
              <div className={cx(styles.button)}>
                <div className={styles.swipeButtons}>
                  {/* <Link
                    to="/subscription"
                    className={cx(styles.menuLink, styles.link)}
                    activeClassName={styles.active}
                    style={{ color: '#fff' }}
                  > */}
                  <IconButton className={styles.swipeButtons_repeat}>
                    <ReplayIcon fontSize="large" />
                  </IconButton>
                  {/* </Link> */}
                  <IconButton className={styles.swipeButtons_left}>
                    <CloseIcon fontSize="large" />
                  </IconButton>
                  <Link
                    to="/favourite"
                    className={cx(styles.menuLink, styles.link)}
                    activeClassName={styles.active}
                    style={{ color: '#fff' }}
                    state={FAV_NFT}
                  >
                    <IconButton className={styles.swipeButtons_star}>
                      <StarRateIcon fontSize="large" />
                    </IconButton>
                  </Link>

                  <IconButton className={styles.swipeButtons_right}>
                    <FavoriteIcon fontSize="large" />
                  </IconButton>
                  <Link
                    to="/subscription"
                    className={cx(styles.menuLink, styles.link)}
                    activeClassName={styles.active}
                    style={{ color: '#fff' }}
                  >
                    <IconButton className={styles.swipeButtons_lightning}>
                      <FlashOnIcon fontSize="large" />
                    </IconButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <OfferModal
            setModal={open}
            close={handleClose}
            makeAnOffer={makeAnOffer}
          />
          <Footer />
        </>
      )}
    </div>
  );
};

export default NFTSwipe;
