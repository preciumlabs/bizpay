/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { useHistory, withRouter, NavLink, Link } from 'react-router-dom';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';
import { Menu, MenuItem, useMediaQuery, useTheme } from '@material-ui/core';
import Chat from 'components/Chat';
import { useWeb3React } from '@web3-react/core';
import {
  ExpandMore,
  Search as SearchIcon,
  Menu as MenuIcon,
} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import WalletConnectActions from 'actions/walletconnect.actions';
import AuthActions from 'actions/auth.actions';
import ModalActions from 'actions/modal.actions';
import { shortenAddress, getRandomIPFS } from 'utils';
import { useApi } from 'api';
import { NETWORK_LABEL } from 'constants/networks';
import { ADMIN_ADDRESS } from 'constants/index';
import WFTMModal from 'components/WFTMModal';
import ModModal from 'components/ModModal';
import BanCollectionModal from 'components/BanCollectionModal';
import BanItemModal from 'components/BanItemModal';
import BanUserModal from 'components/BanUserModal';
import BoostCollectionModal from 'components/BoostCollectionModal';
import ConnectWalletModal from 'components/ConnectWalletModal';
import Identicon from 'components/Identicon';

import logoSmallBlue from 'assets/imgs/logo.png';
import iconUser from 'assets/svgs/user.svg';
import iconNotification from 'assets/svgs/notification.svg';
import iconWallet from 'assets/svgs/collectibles.svg';
import iconTrading from 'assets/svgs/trading.svg';
import iconSearch from 'assets/svgs/search.svg';
import iconCreate from 'assets/svgs/art.svg';
import iconAbout from 'assets/svgs/info.svg';
import iconService from 'assets/svgs/utility.svg';
import iconAdd from 'assets/svgs/magnifier.svg';
import iconEdit from 'assets/svgs/edit.svg';
import iconSwap from 'assets/svgs/swap.svg';

import styles from './styles.module.scss';
import FilterActions from '../../actions/filter.actions';

const Header = ({ border }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
    noSsr: true,
  });

  const {
    apiUrl,
    storageUrl,
    getAuthToken,
    getAccountDetails,
    getIsModerator,
  } = useApi();
  const { account, chainId, deactivate, library } = useWeb3React();

  const { user } = useSelector(state => state.Auth);
  let isSearchbarShown = useSelector(state => state.HeaderOptions.isShown);
  const { isModerator } = useSelector(state => state.ConnectWallet);
  const { wftmModalVisible, connectWalletModalVisible } = useSelector(
    state => state.Modal
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorDefeaultEl, setAnchorDefaultEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchBarActive, setSearchBarActive] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [modModalVisible, setModModalVisible] = useState(false);
  const [isBan, setIsBan] = useState(false);
  const [banCollectionModalVisible, setBanCollectionModalVisible] = useState(
    false
  );
  const [banItemModalVisible, setBanItemModalVisible] = useState(false);
  const [banUserModalVisible, setBanUserModalVisible] = useState(false);
  const [unbanUserModalVisible, setUnbanUserModalVisible] = useState(false);
  const [
    boostCollectionModalVisible,
    setBoostCollectionModalVisible,
  ] = useState(false);

  const [keyword, setKeyword] = useState('');
  const [cancelSource, setCancelSource] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [tokenDetailsLoading, setTokenDetailsLoading] = useState(false);
  const timer = useRef(null);
  const [popup, setPopup] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isDefaultMenuOpen = Boolean(anchorDefeaultEl);

  const login = async () => {
    const { url } = library.connection;
    console.log('url', url);
    try {
      setLoading(true);
      const token = await getAuthToken(account, url);
      const isModerator = await getIsModerator(account);

      dispatch(WalletConnectActions.connectWallet(token, isModerator));
      dispatch(AuthActions.fetchStart());
      try {
        const { data } = await getAccountDetails(token);
        dispatch(AuthActions.fetchSuccess(data));
      } catch {
        dispatch(AuthActions.fetchFailed());
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const init = () => {
    login();
  };

  useEffect(() => {
    if (account) {
      init();
    } else {
      handleSignOut();
    }
  }, [account, chainId]);

  const handleGoToPage = page => {
    if (page === 'connect') {
      dispatch(ModalActions.showConnectWalletModal());
    } else {
      history.push(`/${page}`);
    }
  };
  const handleConnectWallet = () => {
    dispatch(ModalActions.showConnectWalletModal());
  };

  const resetResults = () => {
    setAccounts([]);
    setCollections([]);
    setTokens([]);
    setBundles([]);
  };

  useEffect(() => {
    resetResults();
  }, [isSearchbarShown]);

  const search = async word => {
    setKeyword(word);

    if (cancelSource) {
      cancelSource.cancel();
    }

    if (word.length === 0) {
      resetResults();

      return;
    }

    try {
      const cancelTokenSource = axios.CancelToken.source();
      setCancelSource(cancelTokenSource);

      const {
        data: {
          data: { accounts, collections, tokens, bundles },
        },
      } = await axios({
        method: 'post',
        url: `${apiUrl}/info/searchNames`,
        data: JSON.stringify({ name: word }),
        headers: {
          'Content-Type': 'application/json',
        },
        cancelToken: cancelTokenSource.token,
      });

      Promise.all(
        tokens.map(async token => {
          if (token.imageURL) {
            token.imageURL = getRandomIPFS(token.imageURL);
          }

          if (token.imageURL === '-') {
            const {
              data: { image },
            } = await axios.get(token.tokenURI);

            if (image) {
              // eslint-disable-next-line require-atomic-updates
              token.imageURL = getRandomIPFS(token.imageURL);
            }
          }
        })
      );

      setAccounts(accounts);
      setCollections(collections);
      setTokenDetailsLoading(true);
      setTokens(tokens);
      setBundles(bundles);
      setTokenDetailsLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setCancelSource(null);
    }
  };

  const handleSelectCollection = addr => {
    dispatch(FilterActions.updateCollectionsFilter([addr]));
  };

  const handleSearch = word => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => search(word), 500);
  };

  const handleSignOut = () => {
    try {
      deactivate();
      dispatch(WalletConnectActions.disconnectWallet());
      dispatch(AuthActions.signOut());
      handleMenuClose();
    } catch (err) {
      console.log('e', err);
    }
  };

  const handleProfileMenuOpen = e => {
    console.log('handle Profile menu open');
    setAnchorEl(e.currentTarget);
  };

  const handleDefaultMenuOpen = e => {
    console.log('handle defalut menu open');
    setAnchorDefaultEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAnchorDefaultEl(null);
  };

  const goToMyProfile = () => {
    history.push(`/account/${account}`);
    handleMenuClose();
  };

  const goToNotificationSettings = () => {
    history.push(`/settings/notification`);
    handleMenuClose();
  };

  const handleCreateCollection = () => {
    history.push('/collection/create');
    handleMenuClose();
  };

  const handleRegisterCollection = () => {
    history.push('/collection/register');
    handleMenuClose();
  };

  const openWrapStation = () => {
    dispatch(ModalActions.showWFTMModal());
    handleMenuClose();
  };

  const addMod = () => {
    setIsAdding(true);
    setModModalVisible(true);
    handleMenuClose();
  };

  const removeMod = () => {
    setIsAdding(false);
    setModModalVisible(true);
    handleMenuClose();
  };

  const reviewCollections = () => {
    history.push('/collection/review');
    handleMenuClose();
  };

  const banCollection = () => {
    setIsBan(true);
    setBanCollectionModalVisible(true);
    handleMenuClose();
  };

  const unbanCollection = () => {
    setIsBan(false);
    setBanCollectionModalVisible(true);
    handleMenuClose();
  };

  const banItems = () => {
    setBanItemModalVisible(true);
    handleMenuClose();
  };

  const banUser = () => {
    setBanUserModalVisible(true);
    handleMenuClose();
  };

  const unbanUser = () => {
    setUnbanUserModalVisible(true);
    handleMenuClose();
  };

  const boostCollection = () => {
    setBoostCollectionModalVisible(true);
    handleMenuClose();
  };

  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      classes={{
        paper: styles.profilemenu,
        list: styles.menuList,
      }}
    >
      {account && (
        <div
          className={cx(styles.menuItem, styles.topItem)}
          onClick={goToMyProfile}
        >
          <img src={iconUser} className={styles.menuIcon} />
          My Profile
        </div>
      )}
      <div className={styles.menuItem} onClick={goToNotificationSettings}>
        <img src={iconNotification} className={styles.menuIcon} />
        Notification Settings
      </div>
      <div className={styles.menuItem} onClick={handleCreateCollection}>
        <img src={iconAdd} className={styles.menuIcon} />
        Create New Collection
      </div>
      {/* 
      <div className={styles.menuItem} onClick={handleRegisterCollection}>
        <img src={iconEdit} className={styles.menuIcon} />
        Register Existing Collection
      </div>
      */}
      <div className={styles.menuItem} onClick={openWrapStation}>
        <img src={iconSwap} className={styles.menuIcon} />
        ETH / WETH Station
      </div>

      <div className={styles.menuSeparator} />
      {account?.toLowerCase() === ADMIN_ADDRESS.toLowerCase()
        ? [
            <div key={0} className={styles.menuItem} onClick={addMod}>
              Add Mod
            </div>,
            <div key={1} className={styles.menuItem} onClick={removeMod}>
              Remove Mod
            </div>,
            <div
              key={2}
              className={styles.menuItem}
              onClick={reviewCollections}
            >
              Review Collections
            </div>,
            <div key={3} className={styles.menuItem} onClick={banCollection}>
              Ban Collection
            </div>,
            <div key={4} className={styles.menuItem} onClick={unbanCollection}>
              Unban Collection
            </div>,
            <div key={5} className={styles.menuItem} onClick={banItems}>
              Ban Items
            </div>,
            <div key={6} className={styles.menuItem} onClick={banUser}>
              Ban a user
            </div>,
            <div key={6} className={styles.menuItem} onClick={unbanUser}>
              Unban a user
            </div>,
            <div key={7} className={styles.menuItem} onClick={boostCollection}>
              Boost Collection
            </div>,
            <div key={8} className={styles.menuSeparator} />,
          ]
        : isModerator
        ? [
            <div key={1} className={styles.menuItem} onClick={banCollection}>
              Ban Collection
            </div>,
            <div key={2} className={styles.menuItem} onClick={banItems}>
              Ban Items
            </div>,
            <div key={3} className={styles.menuItem} onClick={banUser}>
              Ban a user
            </div>,
            <div key={6} className={styles.menuItem} onClick={unbanUser}>
              Unban a user
            </div>,
            <div key={4} className={styles.menuSeparator} />,
          ]
        : null}
      <div className={styles.signOut} onClick={handleSignOut}>
        Sign Out
      </div>
    </Menu>
  );

  const renderDefaultMenu = (
    <Menu
      anchorEl={anchorDefeaultEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isDefaultMenuOpen}
      onClose={handleMenuClose}
      classes={{
        paper: styles.profilemenu,
        list: styles.menuList,
      }}
    >
      <MenuItem onClick={() => handleConnectWallet()}>
        <img className={styles.resultimg} src="/wallet_connect_menu.png" />
        Connect Wallet
      </MenuItem>
      {isMobile && (
        <MenuItem onClick={() => handleGoToPage('get-a-valuation')}>
          Get a Valuation
        </MenuItem>
      )}

      {isMobile && (
        <MenuItem onClick={() => handleGoToPage('create')}>Sell Now</MenuItem>
      )}
      {isMobile && (
        <MenuItem onClick={() => handleGoToPage('bizflip-broker')}>
          Bizflip Broker
        </MenuItem>
      )}

      {isMobile && (
        <MenuItem onClick={() => handleGoToPage('roadmap')}>Roadmap</MenuItem>
      )}
    </Menu>
  );

  const renderSearchBox = () => (
    <div className={cx(styles.searchcont, searchBarActive && styles.active)}>
      <div className={styles.searchcontinner}>
        {searchBarActive && (
          <div className={styles.resultcont}>
            {collections.length > 0 && (
              <div className={styles.resultsection}>
                <div className={styles.resultsectiontitle}>Collections</div>
                <div className={styles.separator} />
                <div className={styles.resultlist}>
                  {collections.map((collection, idx) => (
                    <div
                      key={idx}
                      className={styles.result}
                      onClick={() =>
                        handleSelectCollection(collection.erc721Address)
                      }
                    >
                      <img
                        className={styles.resultimg}
                        src={`${getRandomIPFS('', true)}${
                          collection.logoImageHash
                        }`}
                      />
                      <div className={styles.resulttitle}>
                        {collection.collectionName}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {accounts.length > 0 && (
              <div className={styles.resultsection}>
                <div className={styles.resultsectiontitle}>Accounts</div>
                <div className={styles.separator} />
                <div className={styles.resultlist}>
                  {accounts.map((account, idx) => (
                    <Link
                      to={`/account/${account.address}`}
                      key={idx}
                      className={styles.result}
                    >
                      {account.imageHash ? (
                        <img
                          className={styles.resultimg}
                          src={`https://cloudflare-ipfs.com/ipfs/${account.imageHash}`}
                        />
                      ) : (
                        <Identicon
                          className={styles.resultimg}
                          account={account.address}
                          size={40}
                        />
                      )}
                      <div className={styles.resulttitle}>{account.alias}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {tokens.length > 0 && (
              <div className={styles.resultsection}>
                <div className={styles.resultsectiontitle}>Items</div>
                <div className={styles.separator} />
                <div className={styles.resultlist}>
                  {tokens.map((tk, idx) => (
                    <Link
                      to={`/explore/${tk.contractAddress}/${tk.tokenID}`}
                      key={idx}
                      className={styles.result}
                    >
                      <div className={styles.resultimg}>
                        {tokenDetailsLoading ? (
                          <Skeleton width={40} height={40} />
                        ) : (
                          tk.thumbnailPath &&
                          (tk.thumbnailPath.length > 10 ? (
                            <img
                              src={`${storageUrl}/image/${tk.thumbnailPath}`}
                            />
                          ) : tk.thumbnailPath === '.' ? (
                            <img src={tk.imageURL} />
                          ) : null)
                        )}
                      </div>
                      <div className={styles.resulttitle}>{tk.name}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {bundles.length > 0 && (
              <div className={styles.resultsection}>
                <div className={styles.resultsectiontitle}>Bundles</div>
                <div className={styles.separator} />
                <div className={styles.resultlist}>
                  {bundles.map((bundle, idx) => (
                    <Link
                      to={`/bundle/${bundle._id}`}
                      key={idx}
                      className={styles.result}
                    >
                      <div className={styles.resultimg}></div>
                      <div className={styles.resulttitle}>{bundle.name}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {keyword.length > 0 &&
              collections.length === 0 &&
              accounts.length === 0 &&
              tokens.length === 0 &&
              bundles.length === 0 && (
                <div className={styles.noResults}>No Results</div>
              )}
          </div>
        )}
      </div>
    </div>
  );
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <div className={cx(styles.header, border && styles.hasBorder)}>
      <Chat />
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          <img src={logoSmallBlue} alt="logo" />
        </Link>
        {isSearchbarShown && renderSearchBox()}
      </div>
      <div className={styles.menu}>
        {isSearchbarShown && renderSearchBox()}
        <NavLink
          to="/get-a-valuation"
          className={cx(styles.menuLink, styles.link)}
          activeClassName={styles.active}
          style={{ color: '#fff' }}
        >
          Get a Valuation
        </NavLink>
        {/* <NavLink
          to="/nft-swipe"
          className={cx(styles.menuLink, styles.link)}
          activeClassName={styles.active}
          style={{ color: '#fff' }}
        >
          NFT Swipe
        </NavLink> */}
        <NavLink
          to="/create"
          className={cx(styles.menuLink, styles.link)}
          activeClassName={styles.active}
          style={{ color: '#fff' }}
        >
          Sell Now
        </NavLink>

        <div
          className={cx(styles.menuLink, styles.link)}
          style={{ color: '#fff', display: 'flex' }}
          onClick={() => setPopup(prev => !prev)}
        >
          Resources
          <div className={styles.dropdownContainer}></div>
          {popup && (
            <div className={styles.popup}>
              <NavLink
                to="/bizflip-broker"
                className={cx(styles.menuLink, styles.link)}
                activeClassName={styles.active}
                style={{
                  color: '#fff',
                  textAlign: 'left',
                  marginRight: '0px',
                  padding: '10px 0',
                  borderBottom: '1px solid #fff',
                  paddingTop: '0',
                }}
              >
                Bizflip Broker
              </NavLink>
              {/* <NavLink
                to="/our-service"
                className={cx(styles.menuLink, styles.link)}
                activeClassName={styles.active}
                style={{
                  borderBottom: '1px solid #fff',
                  color: '#fff',
                  textAlign: 'left',
                  padding: '10px 0',
                  marginRight: '0px',
                }}
              >
                Services
              </NavLink> */}
              <NavLink
                to="/roadmap"
                className={cx(styles.menuLink, styles.link)}
                activeClassName={styles.active}
                style={{
                  color: '#fff',
                  textAlign: 'left',
                  padding: '10px 0',
                  marginRight: '0px',
                }}
              >
                Roadmap
              </NavLink>
            </div>
          )}
        </div>
        {account ? (
          <div
            className={cx(styles.account, styles.menuLink)}
            onClick={handleProfileMenuOpen}
          >
            {loading ? (
              <Skeleton className={styles.avatar} />
            ) : user?.imageHash ? (
              <img
                src={`https://cloudflare-ipfs.com/ipfs/${user?.imageHash}`}
                width="24"
                height="24"
                className={styles.avatar}
              />
            ) : (
              <Identicon
                account={account}
                size={36}
                className={styles.avatar}
              />
            )}
            <div className={styles.profile}>
              <div className={styles.address}>
                {loading ? (
                  <Skeleton width={120} />
                ) : (
                  user?.alias || shortenAddress(account)
                )}
              </div>
              <div className={styles.network}>
                {loading ? <Skeleton width={80} /> : NETWORK_LABEL[chainId]}
              </div>
            </div>
            <ExpandMore
              className={cx(styles.expand, isMenuOpen && styles.expanded)}
            />
          </div>
        ) : (
          <div
            className={cx(styles.connect, styles.menuLink)}
            onClick={handleDefaultMenuOpen}
            // onClick={handleConnectWallet}
          >
            <MenuIcon />
          </div>
        )}
      </div>
      {renderProfileMenu}
      {renderDefaultMenu}
      <WFTMModal
        visible={wftmModalVisible}
        onClose={() => dispatch(ModalActions.hideWFTMModal())}
      />
      <ModModal
        isAdding={isAdding}
        visible={modModalVisible}
        onClose={() => setModModalVisible(false)}
      />
      <BanCollectionModal
        visible={banCollectionModalVisible}
        isBan={isBan}
        onClose={() => setBanCollectionModalVisible(false)}
      />
      <BanItemModal
        visible={banItemModalVisible}
        onClose={() => setBanItemModalVisible(false)}
      />
      <BanUserModal
        visible={banUserModalVisible}
        onClose={() => setBanUserModalVisible(false)}
        isForBanning={true}
      />
      <BanUserModal
        visible={unbanUserModalVisible}
        onClose={() => setUnbanUserModalVisible(false)}
        isForBanning={false}
      />
      <BoostCollectionModal
        visible={boostCollectionModalVisible}
        onClose={() => setBoostCollectionModalVisible(false)}
      />
      <ConnectWalletModal
        visible={connectWalletModalVisible}
        onClose={() => dispatch(ModalActions.hideConnectWalletModal())}
      />
    </div>
  );
};

export default withRouter(Header);
