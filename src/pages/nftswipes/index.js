import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Styles from './Styles.module.scss';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
// import data from './data';
import ReactCardFlip from 'react-card-flip';
import { useApi } from 'api';
import {
  useNFTContract,
  useBundleSalesContract,
  useSalesContract,
} from 'contracts';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import Header from 'components/header';
import cx from 'classnames';
import { Contracts } from 'constants/networks';
import { ethers } from 'ethers';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import StarRateIcon from '@material-ui/icons/StarRate';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import ReplayIcon from '@material-ui/icons/Replay';
import ModalActions from 'actions/modal.actions';
import Footer from 'components/footer';
import OfferModal from 'components/OfferModal';
import { formatError } from 'utils';
import showToast from 'utils/toast';
import NftItem from './NftItem';
import { useWeb3React } from '@web3-react/core';
import BackCard from 'pages/nftswipe/backCard';
import Subscription from 'pages/subscription';
import doxImage from 'assets/imgs/doxxed.png';

const FAV_NFT = [];

function index() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector(state => state.Auth);
  const tokenType = useRef();
  const { account, chainId } = useWeb3React();
  const location = useLocation();
  const context = useWeb3React();
  const que_res = location.state;
  const [startPoint, setStartPoint] = useState({ x: null, y: null });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [tokens, setTokens] = useState();
  const [isFlipped, setIsFlipped] = useState(false);
  const [holders, setHolders] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [open, setOpen] = useState(false);
  const [doxxed, setDoxxed] = useState([]);
  const [premium, setPremium] = useState(false);
  const [type, setType] = useState('');
  const handleClose = () => setOpen(false);
  const { fetchNFTdata, getDoxxed, makeEscrowOffer } = useApi();
  const { authToken } = useSelector(state => state.ConnectWallet);
  const [offerPlacing, setOfferPlacing] = useState(false);
  const [offerModalVisible, setOfferModalVisible] = useState(false);

  const swipeCount = 3;
  const { getERC20Contract } = useNFTContract();
  const { createBundleOffer } = useBundleSalesContract();
  const { createOffer } = useSalesContract();
  let fav = [];
  if (que_res) {
    fav = que_res?._types.map(item => {
      return item.value;
    });
  }
  const minValue = que_res?._min;
  const maxValue = que_res?._max;
  const faithQuestion = que_res?._res;
  // const card = useRef();

  useEffect(() => {
    if (context.account && authToken) {
      fetchDoxxedStatus(context.account, authToken);
      fetchNFT(authToken);
      setHolders([]);
    }
  }, [context.account, authToken]);

  const maxSupply = useCallback(() => {
    let supply = 0;
    holders.map(holder => {
      if (
        holder.address.toLowerCase() !== account?.toLowerCase() &&
        holder.supply > supply
      ) {
        supply = holder.supply;
      }
    });
    return supply;
  }, [holders]);

  async function fetchDoxxedStatus(account, authToken) {
    const res = await getDoxxed(account, authToken);
    if (res) {
      const doxes = res.doxes.map(value => value.account.toLowerCase());
      setDoxxed(doxes);
    }
  }

  async function fetchNFT(authToken) {
    if (fav.length > 0 && minValue && maxValue && faithQuestion) {
      const res = await fetchNFTdata(
        fav,
        minValue,
        maxValue,
        account,
        authToken
      );
      setTokens(res.data.map(ele => ({ ...ele, isFlipped: false })));
    } else {
      history.push('/');
    }
  }

  const handleMakeOfferModal = () => {
    if (!user?.email) {
      showToast('info', 'Please add your Email and Name in Account Settings.');
    } else {
      setOfferModalVisible(true);
    }
  };

  const handleMakeOffer = async (
    token,
    _price,
    quantity,
    endTime,
    tokenPrice,
    isEscrow
  ) => {
    try {
      if (isEscrow === true) {
        const { contractAddress, tokenID } = selectedToken;
        setOfferPlacing(true);
        const res = await makeEscrowOffer(
          contractAddress,
          tokenPrice,
          account,
          tokenID,
          endTime.getTime(),
          authToken
        );
        const { status } = res;
        if (status === 'success') {
          showToast('success', 'Escrow Offer is created');
        } else {
          showToast('info', 'You already submitted your offer.');
        }
        setOfferPlacing(false);
        setOfferModalVisible(false);
      } else {
        const { contractAddress, tokenID, items } = selectedToken;
        setOfferPlacing(true);
        const price = ethers.utils.parseUnits(_price, token.decimals);
        const deadline = Math.floor(endTime.getTime() / 1000);
        const amount = price.mul(quantity);
        // console.log('token', token);
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const ethBalance = await provider.getBalance(account);
        // console.log('eth balance', ethBalance);
        const erc20 = await getERC20Contract(token.address);
        const balance = await erc20.balanceOf(account);
        if (balance.lt(amount)) {
          const toastId = showToast(
            'error',
            `Insufficient ${token.symbol} Balance!`,
            token.symbol === 'WETH'
              ? 'You can wrap ETH in the WETH station.'
              : `You can exchange ${token.symbol} on other exchange site.`,
            () => {
              toast.dismiss(toastId);
              setOfferModalVisible(false);
              if (token.symbol === 'WETH') {
                dispatch(ModalActions.showWFTMModal());
              }
            }
          );
          setOfferPlacing(false);
          return;
        }

        if (items) {
          const allowance = await erc20.allowance(
            account,
            Contracts[chainId].bundleSales
          );
          if (allowance.lt(amount)) {
            const tx = await erc20.approve(
              Contracts[chainId].bundleSales,
              amount
            );
            await tx.wait();
          }

          const tx = await createBundleOffer(
            items ? selectedToken._id : null,
            token.address,
            price,
            ethers.BigNumber.from(deadline)
          );

          await tx.wait();
        } else {
          const allowance = await erc20.allowance(
            account,
            Contracts[chainId].sales
          );
          if (allowance.lt(amount)) {
            const tx = await erc20.approve(
              Contracts[chainId].sales,
              ethers.constants.MaxUint256
            );
            await tx.wait();
          }
          const tx = await createOffer(
            contractAddress,
            ethers.BigNumber.from(tokenID),
            token.address,
            ethers.BigNumber.from(quantity),
            price,
            ethers.BigNumber.from(deadline),
            type
          );

          await tx.wait();
        }

        setOfferModalVisible(false);
      }
    } catch (e) {
      showToast('error', formatError(e));
      console.log(e);
    } finally {
      setOfferPlacing(false);
    }
  };

  const makeAnOffer = async () => {
    if (account === '') return;
    setType('offer');
    handleMakeOfferModal();
    handleClose();
  };

  const invest = async () => {
    if (account === '') return;
    setType('invest');
    handleMakeOfferModal();
    handleClose();
  };

  const handleLater = e => {
    console.log('handleLater', e.currentTarget);
  };

  // All Eventss
  const handleMouseDown = e => {
    setStartPoint({ x: e.clientX, y: e.clientY });
    e.currentTarget.style.transition = '';
  };

  const handleMouseUp = (e, token) => {
    setStartPoint({ x: null, y: null });
    setOffset({ x: 0, y: 0 });
    removeEventListener('mousemove', handleMouseMove(e, token));
    e.currentTarget.style.transition = 'transform 0.2s';
    e.currentTarget.style.transform = '';
  };

  const dismiss = (e, direction) => {
    e.preventDefault();
    // e.currentTarget.removeEventListener('mousemove', handleMouseMove(e));
    // e.currentTarget.removeEventListener('mouseup', handleMouseUp(e));
    setStartPoint({ x: null, y: null });
    setOffset({ x: 0, y: 0 });
    e.currentTarget.style.transition = 'transform 0.8s';
    e.currentTarget.style.transform = `translate(${direction *
      window.innerWidth}px, ${offset.y}px)`;
  };

  const [left_count, setLeftCount] = useState(0);
  const [right_count, setRightCount] = useState(0);

  // const isMine =
  //   selectedToken &&
  //   (tokenType.current === 721 || selectedToken.tokenId
  //     ? owner?.toLowerCase() === account?.toLowerCase()
  //     : !!myHolding);

  // const myHolding = useMemo(
  //   () =>
  //     holders.find(
  //       holder => holder.address.toLowerCase() === account?.toLowerCase()
  //     ),
  //   [holders, account]
  // );
  const handleMouseMove = async (e, token) => {
    if (!startPoint.x || !startPoint.y) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    setOffset({ x: clientX - startPoint.x, y: clientY - startPoint.y });

    e.currentTarget.style.transform = `translate(${offset.x}px, ${offset.y}px)`;

    if (Math.abs(offset.x) > e.currentTarget.clientWidth * 0.5) {
      const _direction = offset.x > 0 ? 1 : -1;

      if (user.subscribed) {
        if (_direction === 1) {
          setRightCount(right_count + 1);
          setPremium(false);
          setOpen(true);
          setSelectedToken(token);
          dismiss(e, _direction);
        } else if (_direction === -1) {
          setLeftCount(left_count + 1);
          dismiss(e, _direction);
          setPremium(false);
        } else {
          dismiss(e, _direction);
        }
      } else {
        if (_direction === 1) {
          setRightCount(right_count + 1);
          if (right_count >= swipeCount) {
            setPremium(true);
          } else {
            setPremium(false);
            setOpen(true);
            setSelectedToken(token);
            dismiss(e, _direction);
          }
        } else if (_direction === -1) {
          setLeftCount(left_count + 1);
          if (left_count >= swipeCount) {
            setPremium(true);
          } else {
            dismiss(e, _direction);
            setPremium(false);
          }
        } else {
          dismiss(e, _direction);
        }
      }
    }
  };

  const handleClick = e => {
    e.preventDefault();
    let isDragged = false;
    if (offset.x !== 0) isDragged = true;
    setOffset({ x: 0, y: 0 });
    if (isDragged) {
      setIsFlipped(false);
    } else {
      setIsFlipped(prevState => !prevState);
    }
  };

  const handleTouchStart = e => {
    setStartPoint({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    e.currentTarget.style.transition = '';
  };

  // TouchEnd is like MouseUp
  const handleTouchEnd = e => {
    // setStartPoint({ x: null, y: null });
    // setOffset({ x: 0, y: 0 });
    e.currentTarget.style.transition = 'transform 0.2s';
    e.currentTarget.style.transform = '';
  };

  // TouchMove is like MouseMove
  const handleTouchMove = (e, token) => {
    if (!startPoint.x || !startPoint.y) return;
    const clientX = e.touches[0].clientX;
    const clientY = e.touches[0].clientY;

    setOffset({ x: clientX - startPoint.x, y: clientY - startPoint.y });
    e.currentTarget.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
    if (Math.abs(offset.x) > e.currentTarget.clientWidth * 0.2) {
      const _direction = offset.x > 0 ? 1 : -1;
      if (_direction === 1) {
        setRightCount(right_count + 1);
        if (right_count >= 3) {
          setPremium(true);
        } else {
          setPremium(false);
          setOpen(true);
          setSelectedToken(token);
          dismiss_swipe(e, _direction);
        }
      } else if (_direction === -1) {
        setLeftCount(left_count + 1);
        console.log('right_count', left_count);
        if (left_count >= 50) {
          setPremium(true);
        } else {
          dismiss_swipe(e, _direction);
          setPremium(false);
        }
      } else {
        dismiss_swipe(e, _direction);
      }
    } else {
      handleTouchEnd(e);
    }
  };

  const dismiss_swipe = (e, direction) => {
    setStartPoint({ x: null, y: null });
    setOffset({ x: 0, y: 0 });
    e.currentTarget.style.transition = 'transform 0.2s';
    e.currentTarget.style.transform = `translate(${direction *
      window.innerWidth}px, ${offset.y}px)`;
  };

  return (
    <>
      <Header />
      {premium ? (
        <Subscription authToken={authToken} />
      ) : (
        <>
          <div className={Styles.main_swiper}>
            <div className={Styles.swiper}>
              {tokens &&
                tokens.map((token, index) => (
                  <div
                    key={token._id}
                    onMouseDown={e => {
                      handleMouseDown(e);
                    }}
                    onMouseUp={e => {
                      handleMouseUp(e, token);
                    }}
                    onMouseMove={e => {
                      handleMouseMove(e, token);
                    }}
                    onDragStart={e => {
                      e.preventDefault();
                      handleMouseMove(e, token);
                    }}
                    onClick={e => handleClick(e)}
                    onTouchStart={e => {
                      handleTouchStart(e);
                    }}
                    onTouchMove={e => {
                      handleTouchMove(e, token);
                    }}
                  >
                    <ReactCardFlip
                      isFlipped={isFlipped}
                      key={index}
                      className={Styles.swipecard}
                    >
                      {/* Front card */}
                      <div className={Styles.card}>
                        {doxxed.includes(token.owner.toLowerCase()) ===
                          true && (
                          <div className={Styles.doxx}>
                            <img
                              src={doxImage}
                              alt="img"
                              className={Styles.doxImage}
                            ></img>
                          </div>
                        )}
                        <img
                          src={token.imageURL}
                          alt="img"
                          className={Styles.frontimg}
                        ></img>
                        <h1 className={Styles.frontName}>{token.name}</h1>
                      </div>

                      {/* Back card */}
                      <div className={Styles.card}>
                        <BackCard token={token} />
                      </div>
                    </ReactCardFlip>
                  </div>
                ))}
            </div>

            <div className={Styles.reletive}>
              <div className={cx(Styles.button)}>
                <div className={Styles.swipeButtons}>
                  <IconButton className={Styles.swipeButtons_repeat}>
                    <ReplayIcon fontSize="large" />
                  </IconButton>
                  <IconButton className={Styles.swipeButtons_left}>
                    <CloseIcon fontSize="large" />
                  </IconButton>
                  <Link
                    to="/favourite"
                    className={cx(Styles.menuLink, Styles.link)}
                    activeClassName={Styles.active}
                    style={{ color: '#fff' }}
                    state={FAV_NFT}
                  >
                    <IconButton className={Styles.swipeButtons_star}>
                      <StarRateIcon fontSize="large" />
                    </IconButton>
                  </Link>

                  <IconButton className={Styles.swipeButtons_right}>
                    <FavoriteIcon fontSize="large" />
                  </IconButton>
                  <Link
                    to="/subscription"
                    className={cx(Styles.menuLink, Styles.link)}
                    activeClassName={Styles.active}
                    style={{ color: '#fff' }}
                  >
                    <IconButton className={Styles.swipeButtons_lightning}>
                      <FlashOnIcon fontSize="large" />
                    </IconButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <NftItem
            setModal={open}
            close={handleClose}
            makeAnOffer={makeAnOffer}
            invest={invest}
            later={handleLater}
          />
          <OfferModal
            visible={offerModalVisible}
            onClose={() => setOfferModalVisible(false)}
            onMakeOffer={handleMakeOffer}
            confirming={offerPlacing}
            type={type}
            totalSupply={tokenType.current === 1155 ? maxSupply() : null}
            offers={selectedToken && selectedToken.offers}
            escrowOffer={selectedToken && selectedToken.escrowOffer}
            account={account}
          />
          <Footer />
        </>
      )}
    </>
  );
}

export default index;
