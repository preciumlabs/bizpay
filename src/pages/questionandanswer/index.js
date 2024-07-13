import Header from 'components/header';
import Footer from 'components/footer';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';
import ModalActions from 'actions/modal.actions';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { useHistory } from 'react-router';
import { useApi } from 'api';
import gesture from 'assets/imgs/gesture.png';
import swipe from 'assets/imgs/swipe.png';

const QuenAns = () => {
  const dispatch = useDispatch();
  const context = useWeb3React();
  const history = useHistory();
  const [isConnected, setIsConnected] = useState(false);
  const { getDox } = useApi();
  const { authToken } = useSelector(state => state.ConnectWallet);

  useEffect(() => {
    if (
      context.account === undefined ||
      context.account === null ||
      context.account === ''
    ) {
      setIsConnected(false);
    } else {
      setIsConnected(true);
      if (authToken) fetchData(context.account, authToken);
    }
  }, [context.account, authToken]);

  async function fetchData(account, authToken) {
    const res = await getDox(account, authToken);
    if (res.dox) {
      history.replace('/qna');
    }
  }
  const handlClick = () => {
    dispatch(ModalActions.showConnectWalletModal());
  };
  return (
    <div className={styles.container}>
      <Header />
      {isConnected ? (
        <div className={styles.body}>
          <div className={styles.main}>
            <div className={styles.title}>
              Would you like to verify & dox your profile and become more
              trusted?
            </div>
            <div className={styles.btn_group}>
              <NavLink to="/dox">
                <button className={styles.dox_btn}>Dox</button>
              </NavLink>
              <NavLink to="/qna">
                <button className={styles.dox_btn}>maybe later</button>
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.body}>
          <div className={styles.main}>
            <div className={styles.title_area}>
              <img src={gesture} alt="logo" className={styles.title_logo} />
              <p className={styles.connct_title}>Tap & Swipe</p>
              <img src={swipe} alt="logo" className={styles.title_logo} />
            </div>
            <div className={styles.connect_btn}>
              <button onClick={() => handlClick()}>Connect Wallet</button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default QuenAns;
