/* eslint-disable no-undef */
import axios from 'axios';

export const useApi = () => {
  // eslint-disable-next-line no-undef
  const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';
  const testNetUrl = process.env.REACT_APP_TESTNET_URL;
  const mainNetUrl = process.env.REACT_APP_MAIN_URL;
  const explorerUrl = isMainnet ? mainNetUrl : testNetUrl;
  const apiUrl = process.env.REACT_APP_SERVER;

  // eslint-disable-next-line no-undef
  // const apiUrl = process.env.REACT_APP_API_URI;
  const storageUrl = process.env.REACT_APP_SERVER;

  // const tokenURL = 'https://fetch-tokens.vercel.app/api';

  const getNonce = async (address, authToken) => {
    const res = await axios({
      method: 'get',
      url: `${apiUrl}/account/nonce/${address}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const { signup } = res.data;
    if (signup) {
      gtag('event', 'sign_up', {
        method: '',
      });
    }
    return res.data;
  };

  const getAuthToken = async (address, url) => {
    let result = await axios({
      method: 'post',
      url: `${apiUrl}/auth/getToken`,
      data: JSON.stringify({ address: address }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (result.data.status == 'success') {
      let token = result.data.token;
      if (result.data.signup) {
        gtag('event', 'sign_up', {
          method: url,
        });
      }
      return token;
    }
    return null;
  };

  const getIsModerator = async address => {
    const { data } = await axios({
      method: 'get',
      url: `${apiUrl}/mod/isModerator/${address}`,
    });
    if (data.status == 'success') {
      return data.data;
    }
    return false;
  };

  const getAccountDetails = async authToken => {
    const res = await axios({
      method: 'get',
      url: `${apiUrl}/account/getaccountinfo`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return res.data;
  };

  const getUserAccountDetails = async address => {
    const data = { address };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/account/getuseraccountinfo`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.data;
  };

  const getUserFigures = async address => {
    const res = await axios({
      method: 'get',
      url: `${apiUrl}/info/getFigures/${address}`,
    });

    return res.data;
  };

  const updateAccountDetails = async (
    alias,
    email,
    bio,
    avatar,
    authToken,
    signature,
    signatureAddress
  ) => {
    console.log('here ier em');
    const formData = new FormData();
    formData.append('alias', alias);
    formData.append('email', email);
    if (bio) {
      formData.append('bio', bio);
    }
    if (avatar) {
      formData.append('imgData', avatar);
    }
    formData.append('signature', signature);
    formData.append('signatureAddress', signatureAddress);

    const res = await axios({
      method: 'post',
      url: `${apiUrl}/account/accountdetails`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const updateBanner = async (imageData, authToken) => {
    const formData = new FormData();
    formData.append('imgData', imageData);
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/ipfs/uploadBannerImage2Server`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const get1155Info = async (contractAddress, tokenID) => {
    const { data } = await axios.get(
      `${apiUrl}/info/get1155info/${contractAddress}/${tokenID}`
    );
    return data;
  };

  const getTokenHolders = async (contractAddress, tokenID) => {
    const { data } = await axios.get(
      `${apiUrl}/info/getOwnership/${contractAddress}/${tokenID}`
    );
    return data;
  };

  const fetchCollections = async () => {
    const res = await axios.get(`${apiUrl}/info/getcollections`);
    return res.data;
  };

  const getChats = async message => {
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/chat/getChatData`,
      data: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const fetchCollection = async contractAddress => {
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/collection/getCollectionInfo`,
      data: JSON.stringify({ contractAddress }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const getDoxxed = async (id, token) => {
    const res = await axios({
      method: 'get',
      url: `${apiUrl}/account/doxxed/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  const getDox = async (id, token) => {
    const res = await axios({
      method: 'get',
      url: `${apiUrl}/account/dox/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };
  const fetchPendingCollections = async authToken => {
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/collection/getReviewApplications`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const approveCollection = async (contractAddress, authToken) => {
    const data = {
      contractAddress,
      status: 1,
    };
    await axios({
      method: 'post',
      url: `${apiUrl}/collection/reviewApplication`,
      data: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
  };

  const rejectCollection = async (contractAddress, reason, authToken) => {
    const data = {
      contractAddress,
      status: 0,
      reason,
    };
    await axios({
      method: 'post',
      url: `${apiUrl}/collection/reviewApplication`,
      data: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
  };

  const fetchMintableCollections = async authToken => {
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/collection/getMintableCollections`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return res.data;
  };

  const dsignOffer = async (
    tokenAddress,
    contractAddress,
    buyerAddress,
    authToken
  ) => {
    const type = 'offer';
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/docusign/getConsentUrl`,
      data: JSON.stringify({
        tokenAddress,
        contractAddress,
        buyerAddress,
        type,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      authToken,
    });
    return res.data;
  };

  const dsignInvest = async (
    tokenAddress,
    contractAddress,
    buyerAddress,
    authToken
  ) => {
    const type = 'invest';
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/docusign/getConsentUrl`,
      data: JSON.stringify({
        tokenAddress,
        contractAddress,
        buyerAddress,
        type,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      authToken,
    });
    return res.data;
  };
  const fetchTokens = async (
    from,
    count,
    type = 'all',
    collections = [],
    category = null,
    sortBy = 'listedAt',
    filterBy = [],
    address = null,
    cancelToken
  ) => {
    const data = { from, count, type };
    if (collections.length > 0) {
      data.collectionAddresses = collections;
    }
    if (category !== null) {
      data.category = category;
    }
    if (address) {
      data.address = address;
    }
    if (filterBy.length) {
      data.filterby = filterBy;
    }
    data.sortby = sortBy;
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/nftitems/fetchTokens`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      cancelToken,
    });
    return res.data;
  };

  const getItemsLiked = async (items, authToken, cancelToken) => {
    const data = { items: JSON.stringify(items) };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/like/getPageLiked`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      cancelToken,
    });
    return res.data;
  };

  const getBundleDetails = async bundleID => {
    const data = { bundleID };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/bundle/getBundleByID`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const increaseBundleViewCount = async bundleID => {
    const data = { bundleID };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/bundle/increaseViews`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const fetchItemDetails = async (contractAddress, tokenID) => {
    const data = { contractAddress, tokenID };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/nftItems/getSingleItemDetails`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const increaseViewCount = async (contractAddress, tokenID) => {
    const data = { contractAddress, tokenID };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/nftitems/increaseViews`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const getBundleOffers = async bundleID => {
    const data = { bundleID };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/offer/getBundleOffer`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const getBundleTradeHistory = async bundleID => {
    const data = { bundleID };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/tradehistory/getBundleTradeHistory`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const getTransferHistory = async (address, tokenID, tokenType) => {
    const data = { address, tokenID };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/nftitems/transfer${tokenType}History`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const getAccountActivity = async address => {
    const res = await axios({
      method: 'get',
      url: `${apiUrl}/info/getAccountActivity/${address}`,
    });
    return res.data;
  };

  const getActivityFromOthers = async address => {
    const res = await axios({
      method: 'get',
      url: `${apiUrl}/info/getActivityFromOthers/${address}`,
    });
    return res.data;
  };

  const getMyOffers = async address => {
    const res = await axios({
      method: 'get',
      url: `${apiUrl}/info/getOffersFromAccount/${address}`,
    });
    return res.data;
  };

  const addMod = async (
    name,
    address,
    authToken,
    signature,
    signatureAddress
  ) => {
    const data = { name, address, signature, signatureAddress };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/mod/add`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const removeMod = async (address, authToken, signature, signatureAddress) => {
    const data = { address, signature, signatureAddress };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/mod/remove`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const banCollection = async (
    address,
    authToken,
    signature,
    signatureAddress
  ) => {
    const data = { address, signature, signatureAddress };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/ban/banCollection`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const unbanCollection = async (
    address,
    authToken,
    signature,
    signatureAddress
  ) => {
    const data = { address, signature, signatureAddress };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/ban/unbanCollection`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const checkBan = async (address, authToken) => {
    const data = { address };
    const res = await axios({
      method: 'get',
      url: `${apiUrl}/ban/banUser`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    let check = res.data;

    return check.status == 'success' ? true : false;
  };

  const banUser = async (address, authToken, signature, signatureAddress) => {
    const data = { address, signature, signatureAddress };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/ban/banUser`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const unbanUser = async (address, authToken, signature, signatureAddress) => {
    const data = { address, signature, signatureAddress };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/ban/removeBan`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const banItems = async (
    address,
    tokenIDs,
    authToken,
    signature,
    signatureAddress
  ) => {
    const data = { address, tokenIDs, signature, signatureAddress };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/ban/banItems`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const boostCollection = async (address, authToken) => {
    const data = { address };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/ban/boostCollection`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const createBundle = async (name, paymentToken, price, items, authToken) => {
    const data = { name, paymentToken, price, items };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/bundle/createBundle`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const makeEscrowOffer = async (
    contractAddress,
    tokenPrice,
    account,
    tokenId,
    endTime,
    authToken
  ) => {
    const data = { contractAddress, tokenPrice, account, tokenId, endTime };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/offer/postEscrowOffer`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const deleteBundle = async (bundleID, authToken) => {
    const data = { bundleID };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/bundle/removeBundle`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const getFollowing = async (from, to) => {
    const data = { from, to };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/follow/isFollowing`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const followUser = async (follower, follow, authToken) => {
    const data = { follower, status: follow ? 1 : 0 };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/follow/update`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const getFollowers = async address => {
    const res = await axios({
      method: 'get',
      url: `${apiUrl}/follow/getFollowers/${address}`,
    });
    return res.data;
  };

  const getFollowings = async address => {
    const res = await axios({
      method: 'get',
      url: `${apiUrl}/follow/getFollowings/${address}`,
    });
    return res.data;
  };

  const getBundleLikes = async bundleID => {
    const res = await axios({
      method: 'get',
      url: `${apiUrl}/bundle/getLikesCount/${bundleID}`,
    });
    return res.data;
  };

  const isLikingItem = async (contractAddress, tokenID, follower) => {
    const data = {
      type: 'nft',
      contractAddress,
      tokenID,
      follower,
    };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/like/isLiked`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const isLikingBundle = async (bundleID, follower) => {
    const data = {
      type: 'bundle',
      bundleID,
      follower,
    };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/like/isLiked`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const likeItem = async (contractAddress, tokenID, authToken) => {
    const data = {
      type: 'nft',
      contractAddress,
      tokenID,
    };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/like/update`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const likeBundle = async (bundleID, authToken) => {
    const data = {
      type: 'bundle',
      bundleID,
    };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/like/update`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const getItemLikeUsers = async (contractAddress, tokenID) => {
    const data = {
      type: 'nft',
      contractAddress,
      tokenID,
    };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/like/getLikes`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const getBundleLikeUsers = async bundleID => {
    const data = {
      type: 'bundle',
      bundleID,
    };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/like/getLikes`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const getMyLikes = async (step, address) => {
    const data = { step, address };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/like/getMyLikes`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  const getNotificationSettings = async authToken => {
    const res = await axios({
      method: 'get',
      url: `${apiUrl}/account/getnotificationsettings`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const handleSubscription = async (plan, authToken) => {
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/account/postSubscription`,
      data: JSON.stringify({
        plan: plan,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const updateNotificationSettings = async (
    settings,
    authToken,
    signature,
    signatureAddress
  ) => {
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/account/notificationsettings`,
      data: JSON.stringify({
        settings: JSON.stringify(settings),
        signature,
        signatureAddress,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const addUnlockableContent = async (
    contractAddress,
    tokenID,
    content,
    signature,
    signatureAddress,
    authToken
  ) => {
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/unlockable/addUnlockableContent`,
      data: JSON.stringify({
        contractAddress,
        tokenID,
        content,
        signature,
        signatureAddress,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const cancelEscrowOffer = async (id, authToken) => {
    const data = { id };
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/offer/deleteEscrowOffer`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };
  const retrieveUnlockableContent = async (
    contractAddress,
    tokenID,
    signature,
    signatureAddress,
    authToken
  ) => {
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/unlockable/retrieveUnlockableContent`,
      data: JSON.stringify({
        contractAddress,
        tokenID,
        signature,
        signatureAddress,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const fetchNFTdata = async (
    fav,
    minPrice,
    maxPrice,
    account,
    lastId,
    authToken
  ) => {
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/nftSwipe/getNFTData`,
      data: {
        filters: {
          category: fav,
          price: {
            minPrice: minPrice,
            maxPrice: maxPrice,
          },
          account: account,
        },
        lastId: lastId,
      },
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  };

  const addToLikeNft = async (account, _id) => {
    const res = await axios({
      method: 'post',
      url: '/nftSwipe/likeNFT',
      data: {
        nftId: _id,
        userAddress: account,
      },
    });
    return res.data;
  };

  return {
    explorerUrl,
    apiUrl,
    storageUrl,
    getNonce,
    getAuthToken,
    getIsModerator,
    getAccountDetails,
    getUserAccountDetails,
    getUserFigures,
    updateAccountDetails,
    updateBanner,
    get1155Info,
    getTokenHolders,
    fetchCollections,
    getChats,
    fetchCollection,
    fetchPendingCollections,
    approveCollection,
    rejectCollection,
    fetchMintableCollections,
    fetchTokens,
    getDox,
    getDoxxed,
    dsignOffer,
    dsignInvest,
    getItemsLiked,
    getBundleDetails,
    increaseBundleViewCount,
    fetchItemDetails,
    increaseViewCount,
    getBundleOffers,
    getBundleTradeHistory,
    getTransferHistory,
    getAccountActivity,
    getActivityFromOthers,
    getMyOffers,
    addMod,
    removeMod,
    banCollection,
    unbanCollection,
    banItems,
    banUser,
    unbanUser,
    checkBan,
    boostCollection,
    createBundle,
    deleteBundle,
    getFollowing,
    followUser,
    getFollowers,
    getFollowings,
    getBundleLikes,
    isLikingItem,
    isLikingBundle,
    likeItem,
    likeBundle,
    getItemLikeUsers,
    getBundleLikeUsers,
    getMyLikes,
    getNotificationSettings,
    updateNotificationSettings,
    addUnlockableContent,
    retrieveUnlockableContent,
    cancelEscrowOffer,
    fetchNFTdata,
    addToLikeNft,
    makeEscrowOffer,
    handleSubscription,
  };
};
