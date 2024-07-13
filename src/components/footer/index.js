/* eslint-disable no-unused-vars */
import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import FilterActions from 'actions/filter.actions';
import {
  BsDiscord,
  BsTwitter,
  BsInstagram,
  BsReddit,
  BsYoutube,
} from 'react-icons/bs';
import { FaTiktok } from 'react-icons/fa';
import { Categories } from 'constants/filter.constants';
import Chat from 'components/Chat';
import logo from 'assets/imgs/logo.png';
const Footer = ({ border }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleViewCategory = id => {
    dispatch(FilterActions.updateCategoryFilter(id === 'all' ? null : id));
    history.push('/explore');
  };

  const iframe =
    '<iframe frameborder="0" style="height:500px;width:99%;border:none;" src="https://forms.zohopublic.com/bizfip/form/EmailSubscription/formperma/HXUPLUQG9rlzmG0hSsEaP5JT9bz-ziky41irSYjKa_Q"></iframe>';

  function Iframe(props) {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : '' }}
      />
    );
  }

  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <Chat />
        <div className={styles.footerSocial}>
          <div className={styles.stayLoop}>
            <div>
              <form
                action="https://forms.zohopublic.com/bizfip/form/EmailSubscription/formperma/jJmYBW8BqrpFC0rrMXBsRuk4VcVjrCoasmaIN3_LG9Q/htmlRecords/submit"
                name="form"
                id="form"
                method="POST"
                acceptCharset="UTF-8"
                encType="multipart/form-data"
              >
                <input type="hidden" name="zf_referrer_name" value="" />
                <input type="hidden" name="zf_redirect_url" value="" />
                <input type="hidden" name="zc_gad" value="" />
                <h2 style={{ color: '#ffffff' }}>Stay in the loop</h2>

                <div className={styles.newsLetter}>
                  <input
                    name="Email"
                    type="text"
                    className={cx(styles.formInput)}
                    placeholder="Enter Email Address"
                  />
                  <button className={cx(styles.button)}>Sign up</button>
                </div>
                <p>
                  Join our mailing list to stay in the loop with bizflip newest
                  feature releases, new listings and insider tips and tricks
                </p>
              </form>
            </div>
          </div>
          <div className={styles.socialList}>
            <h3>Join the community</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div>
                <a
                  href="https://discord.gg/9v2fmYqbYd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerIcons}
                >
                  <BsDiscord />
                </a>
              </div>
              <div>
                <a
                  className={styles.footerIcons}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/bizflipmarket"
                >
                  <BsTwitter />
                </a>
              </div>
              <div>
                <a
                  className={styles.footerIcons}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/bizflip.io/?next=%2F"
                >
                  <BsInstagram />
                </a>
              </div>
              <div>
                <a
                  className={styles.footerIcons}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.Reddit.com/r/bizflip/"
                >
                  <BsReddit />
                </a>
              </div>
              <div>
                <a
                  className={styles.footerIcons}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://m.youtube.com/channel/UCaDnvGeQQFyIboVxEfIcKfQ"
                >
                  <BsYoutube />
                </a>
              </div>
              <div>
                <a
                  className={styles.footerIcons}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.tiktok.com/@bizflip"
                >
                  <FaTiktok />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footerCategories}>
          <div className={styles.footerLogo}>
            <img src={logo} alt="logo" className={styles.logo} />
            <p>
              The worlds first and best web3 based solution for asset
              acquisition. Join a community of dreamers, innovators and doers.
              From builders to investors, bring your dreams to fruition. Tap &
              swipe on assets available. You never know when you’ll find the
              next hidden gem. Bizflip allows users to list assets in e-ccomerce
              , brick and mortar, dapps & so much more. From cash flowing and
              profitable to pre-seed ventures, this is where you`ll find it all.
            </p>
          </div>
          <div className={styles.footerList}>
            <h4>My Account</h4>
            <ul>
              <li>Profile</li>
              <li>Settings</li>
            </ul>
          </div>
          <div className={styles.footerList}>
            <h4>Resources</h4>
            <ul>
              <li>Help center</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className={styles.footerList}>
            <h4>Company</h4>
            <ul>
              <li>
                <Link to={`/about`}>About</Link>
              </li>
              <li>Careers</li>
            </ul>
          </div>
        </div>
        <div className={styles.footerServices}>
          <div className={styles.footerCompany}>
            <p>© 2023 The Smile Guys Inc, All Rights Reserved.</p>
          </div>
          <div className={styles.footerServicePages}>
            <a
              style={{ textDecoration: 'none', color: '#FFFFFF' }}
              target="_blank"
              rel="noopener noreferrer"
              href="/privacy-policy"
            >
              Privacy Policy
            </a>
            <a
              style={{ textDecoration: 'none', color: '#FFFFFF' }}
              target="_blank"
              rel="noopener noreferrer"
              href="/terms-of-service"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Footer);
