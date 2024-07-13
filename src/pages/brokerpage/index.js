import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card } from '@material-ui/core';
import FilterActions from 'actions/filter.actions';
import HeaderActions from 'actions/header.actions';
import Footer from 'components/footer';
import Header from 'components/header';
import styles from './styles.module.scss';
import { ChevronRight } from '@material-ui/icons';
const dummyBrokerList = [
  {
    name: 'bizflip',
    specialist: 'E-Commerce asset digital assets, saas, digital businesses',
    address: 'United States',
    desc:
      'We now offer our very own representation as well, premier premium service for all our users Representing businesses of all shapes and sizes.',
    id: '1',
    link: '/contactUs',
  },
  {
    name: 'VR Business Brokers',
    price: '$150,000 - $5,000,000',
    specialist: 'Brick & Motor Assets',
    address: 'United States',
    desc: 'Schedule an appointment with VR Business Broker of Charlotte Today',
    id: '2',
    link: 'https://www.vrbbcharlotte.com',
  },
  {
    name: 'Website Properties',
    price: '$250,000 - $5,000,000',
    specialist: 'E-Commerce, Saas, Services, Marketplace, Advertising',
    address: 'United States',
    desc:
      'Website properties is the oldest and trusted digital business brokerage in North America, helping owners of digitally native and tech enabled businesses create their successful exit over 20 years',
    id: '3',
    link: 'https://websiteproperties.com',
  },
];
const BrokerPage = () => {
  const dispatch = useDispatch();

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
              style={{ color: '#FFF' }}
            >{`Website and Online Asset Brokers
            `}</div>
            <div className={styles.bodyText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </div>
            <br></br> */}

            <div className={styles.textContainer}>
              <div className={styles.bodyText} style={{ fontSize: '1.2rem' }}>
                PICK A BIZFLIP AFFILIATED BROKER TO GET STARTED.
              </div>
              <div className={styles.bodyText} style={{ margin: '25px 0' }}>
                Take the stress out of selling, using a broker to help sell your
                asset is a great option for those who are time-poor or simply
                don&apos;t know where to start. A broker will present your asset
                in the best light possible to maximize your sale price.
              </div>
              {dummyBrokerList.map(item => (
                <Card
                  variant="outlined"
                  key={item?.id}
                  className={styles.dummyBrokerList}
                >
                  <div className={styles.leftContainer}>
                    <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                    <div style={{ color: '#63707E' }}>{item.address}</div>
                    <div style={{ marginTop: '10px' }}>
                      <strong>Specialties:</strong>
                      <span style={{ color: '#63707E', marginLeft: '5px' }}>
                        {item.specialist}
                      </span>
                    </div>
                    {item.price?.length && (
                      <div>
                        Representing businesses priced between:
                        <span style={{ color: '#63707E', marginLeft: '5px' }}>
                          {item.price}
                        </span>
                      </div>
                    )}
                    <div style={{ color: '#63707E', marginTop: '10px' }}>
                      {item.desc}
                    </div>
                  </div>
                  <div className={styles.rightContainer}>
                    <div className={styles.buttonContainer}>
                      {item.id === '1' ? (
                        <Link
                          to={item.link}
                          className={styles.exploreButton}
                          style={{
                            textAlign: 'center',
                          }}
                        >
                          Learn more
                          <div className={styles.icon}>
                            <ChevronRight />
                          </div>
                        </Link>
                      ) : (
                        <Link
                          onClick={() => {
                            document.location.href = item.link;
                          }}
                          className={styles.exploreButton}
                          style={{
                            textAlign: 'center',
                          }}
                        >
                          Learn more
                          <div className={styles.icon}>
                            <ChevronRight />
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrokerPage;
