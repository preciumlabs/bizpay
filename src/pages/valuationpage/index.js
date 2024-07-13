import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Card } from '@material-ui/core';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import HeaderActions from 'actions/header.actions';
import FilterActions from 'actions/filter.actions';
import Header from 'components/header';
import Footer from 'components/footer';
import styles from './styles.module.scss';
import { useState } from 'react';
import ValuationActions from 'actions/valuation.action';
import classNames from 'classnames';
import FreeValuation from './freeValution';
/*
import cx from 'classnames';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
const valuationList = [
  {
    id: '1',
    img: 'https://cdn-icons-png.flaticon.com/128/546/546310.png',
    title: 'Valuation List - Title 1',
    data:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: '2',
    img: 'https://cdn-icons-png.flaticon.com/128/5435/5435272.png',
    title: 'Valuation List - Title 2',
    data:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: '3',
    img: 'https://cdn-icons-png.flaticon.com/128/709/709510.png',
    title: 'Valuation List - Title 3',
    data:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
];
*/
const faqs = [
  {
    id: '1',
    question: 'Do I have to pay for this evaluation?',
    answer:
      'Our evaluation tool is free to use, you can use the tool as many times as you like. If you`d like a fee based custom detailed evaluation, you can reach out to <a href="mailto:support@bizflip.io">support@bizflip.io</a>',
  },
  {
    id: '2',
    question: 'Is the bizflip valuation accurate?',
    answer:
      'Yes. Bizflip has more historical sales data than anyone else. If the information you provide is accurate, your bizflip valuation will be a good indicator of your assets monetary value.',
  },
  {
    id: '3',
    question: 'How do we come up with the valuation?',
    answer:
      'Bizflip uses your inputs and compares data to 1000 of similar assets that have sold publicity. We look at modeling, category, age, and many other factors. We will also consider how many buyers are interested in assets like yours along with proprietary processes to provide you with the best opinion of value of your asset.',
  },
  {
    id: '4',
    question: 'How do I sell my asset?',
    answer:
      'If you wish to list your asset for sale or chat with us about your asset, you can either start selling here or send a note to our team at <a href="mailto:support@bizflip.io">support@bizflip.io</a>. We will be happy to provide some additional guidance.',
  },
];
const ValuationPage = () => {
  const dispatch = useDispatch();
  const location = useHistory();
  const {
    /* formState: ValuationFormState, // Form state */
    data: ValuationFormData,
  } = useSelector(state => state.Valuation);
  /* const [toggle, setToggle] = useState('chatbot');
  const active = {
    backgroundColor: '#1969ff',
    color: '#fff',
  }; */
  const [sellUrl, setSellUrl] = useState(ValuationFormData.sellUrl || '');
  const [activeTab, setActiveTab] = useState('free-valuation');

  const onSubmit = e => {
    e?.stopPropagation();
    e?.preventDefault();
    let formData = new FormData(document.getElementById('sell-directly'));
    let sellUrl = formData.get('url');
    dispatch(ValuationActions.setStageOne(sellUrl));
    location.push('sell/generic');
  };

  useEffect(() => {
    dispatch(HeaderActions.toggleSearchbar(false));
    dispatch(FilterActions.updateCategoryFilter(null));
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <div className={styles.main}>
          <div className={styles.mainLeft}>
            {/* <div
              className={styles.title}
              style={{ color: '#FFF', textAlign: 'center' }}
            >{`Lorem Ipsum is simply dummy text
            `}</div>
            <div className={cx(styles.bodyText, styles.bannerText)}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s
            </div>
            <div className={styles.toggle}>
              <button
                className={styles.exploreButton}
                style={toggle === 'chatbot' ? active : null}
                onClick={() => setToggle('chatbot')}
              >
                Chatbot
              </button>
              <button
                className={cx(styles.exploreButton, styles.formButton)}
                style={toggle === 'form' ? active : null}
                onClick={() => setToggle('form')}
              >
                Form
              </button>
            </div>
            {toggle === 'chatbot' && (
              <Card className={styles.chatCard}>
                <div className={styles.chatHeader}>
                  <div style={{ fontWeight: 'bold' }}>
                    Get a FREE Online Valuation
                  </div>
                  <div>
                    <RefreshIcon />
                    <CloseIcon />
                  </div>
                </div>
                <div className={styles.chatContainer}>Lorem Ipsum</div>
                <div className={styles.chatFooter}>
                  <input
                    type="text"
                    placeholder="Type Something"
                    className={styles.chatFooterInput}
                  />
                  <button className={styles.chatFooterButton}>Send</button>
                </div>
              </Card>
            )}
            {toggle === 'form' && (
              <Card className={styles.chatCard}>
                <div className={styles.newsLetter}>
                  <input
                    type="text"
                    className={cx(styles.formInput)}
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    className={cx(styles.formInput)}
                    placeholder="Last Name"
                  />
                  <input
                    type="text"
                    className={cx(styles.formInput)}
                    placeholder="Enter Email Address"
                  />
                  <input
                    type="password"
                    className={cx(styles.formInput)}
                    placeholder="Password"
                  />
                  <button className={cx(styles.button)}>Sign up</button>
                </div>
              </Card>
            )}

            <div
              className={styles.textContainer}
              style={{
                marginTop: '50px',
              }}
            >
              <div className={styles.bodyText}>
                Valuation List Header - Lorem Ipsum is simply dummy text of the
                printing and typesetting industry.
              </div>
              <div className={styles.valuationListContainer}>
                {valuationList.map(item => (
                  <Card key={item.id} style={{ padding: '1rem' }}>
                    <div style={{ marginBottom: '10px' }}>
                      <img src={item.img} alt="image" />
                    </div>
                    <div className={styles.title}>{item.title}</div>
                    <div style={{ marginTop: '10px' }}>{item.data}</div>
                  </Card>
                ))}
              </div>
            </div> */}

            <div className={styles.textContainer}>
              <div className={styles.bodyText} style={{ marginTop: '50px' }}>
                HOW MUCH IS YOUR ASSET WORTH?
              </div>
              {/* Valuation tool section start */}
              <div className={styles.valuationSection}>
                <div className={styles.valuationSectionHeading}>
                  <h1>Free evaluation.</h1>
                  <h5>
                    BizFlip makes it simple and effective to sell your asset.
                    Flexibility, choice and access to the world&lsquo;s largest
                    network of online asset buyers.
                  </h5>
                </div>
                <div className={styles.valuationToolsContainer}>
                  <div className={styles.m2}>
                    <div className={styles.tabs}>
                      {[
                        {
                          label: 'Free Valuation',
                          value: 'free-valuation',
                        },
                        {
                          label: 'Sell Directly',
                          value: 'sell-directly',
                        },
                        {
                          label: 'Sell with a Broker',
                          value: 'sell-with-a-broker',
                        },
                      ].map((tab, i) => (
                        <a
                          key={`tab-${i}`}
                          className={classNames(
                            styles.tab,
                            activeTab === tab.value ? styles.active : ''
                          )}
                          href="#"
                          onClick={() => setActiveTab(tab.value)}
                        >
                          <div className="tab tab-lg-fixed-width h-100 font-weight-700 mr-2 py-2 tab-primary">
                            {tab.label}
                          </div>
                        </a>
                      ))}
                    </div>
                    {activeTab === 'sell-directly' ? (
                      <>
                        <form
                          id="sell-directly"
                          acceptCharset="UTF-8"
                          data-remote="true"
                          onSubmit={onSubmit}
                          className={'ng-pristine ng-valid'}
                        >
                          <input
                            name="utf8"
                            type="hidden"
                            value="✓"
                            autoComplete="off"
                          />
                          <div className={styles.inputContainer}>
                            <input
                              type="url"
                              name="url"
                              placeholder="e.g. mywebsite.com"
                              className="rounded border-0 w-100 p-3"
                              autoComplete="off"
                              value={sellUrl}
                              onChange={e => setSellUrl(e.target.value)}
                            />
                          </div>
                          <div className={styles.sellSubmitContainer}>
                            <button
                              type="submit"
                              disabled={!sellUrl}
                              className={styles.sellSubmit}
                              onClick={onSubmit}
                            >
                              Continue →
                            </button>
                          </div>
                        </form>
                        <div className={styles.sellInputSubLabel}>
                          Use Play Store or App Store URL for mobile apps.
                        </div>
                      </>
                    ) : activeTab === 'free-valuation' ? (
                      <FreeValuation />
                    ) : (
                      <div className={styles.comingSoon}>
                        <div>Coming Soon</div>
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.valuationFeatureContainer}>
                  <div className={styles.valuationFeatureList}>
                    <div className={styles.valuationFeature}>
                      <img
                        className="mr-2"
                        src="/static/images/icons/check-circle.svg"
                      />
                      <span className="font-size-medium-small font-weight-bold mr-md-2 mr-lg-5">
                        Lowest fees in the market
                      </span>
                    </div>
                    <div className={styles.valuationFeature}>
                      <img
                        className="mr-2"
                        src="/static/images/icons/check-circle.svg"
                      />
                      <span className="font-size-medium-small font-weight-bold mr-md-2 mr-lg-5">
                        Sell in under 30 days
                      </span>
                    </div>
                    <div className={styles.valuationFeature}>
                      <img
                        className="mr-2"
                        src="/static/images/icons/check-circle.svg"
                      />
                      <span className="font-size-medium-small font-weight-bold mr-md-2 mr-lg-5">
                        Free Escrow service
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Valuation tool section ends */}
              <div className={styles.assetWorth}>
                {/* <Card style={{ padding: '1rem' }} className={styles.assetCard}>
                  <div className={styles.leftContainer}>
                    <div className={styles.package}>package I</div>
                    <div>
                      Get access to an instant free valuation and insight on how
                      to improve sellability.
                    </div>
                  </div>
                  <div className={styles.rightContainer}>Coming soon</div>
                </Card> */}
                <Card
                  style={{ padding: '1rem', display: 'none' }}
                  className={styles.assetCard}
                >
                  <div className={styles.leftContainer}>
                    <div className={styles.package}>package II</div>
                    <div>
                      Get extensive custom valuation with deep market research
                      on what similar assets like yours have sold for, included
                      is a broker&apos;s opinion of value tailored for your
                      specific assets.
                    </div>
                  </div>
                  <div className={styles.rightContainer}>
                    <Link to={`/contactUs`} className={styles.contact}>
                      Contact Us
                      <ArrowCircleRightIcon className={styles.arrow} />
                    </Link>
                  </div>
                </Card>
              </div>
            </div>

            <div className={styles.textContainer}>
              <div className={styles.bodyText} style={{ marginTop: '50px' }}>
                FAQ&apos;s
              </div>
              <div className={styles.faqs}>
                {faqs.map(item => (
                  <Card key={item.id} style={{ padding: '1rem' }}>
                    <div className={styles.question}>{item.question}</div>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    ></div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ValuationPage;
