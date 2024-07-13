import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import HeaderActions from 'actions/header.actions';
import FilterActions from 'actions/filter.actions';
import Header from 'components/header';
import Footer from 'components/footer';
import styles from './styles.module.scss';

const OurServicePage = () => {
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
            <div
              className={styles.title}
              style={{ color: '#FFF' }}
            >{`More Security, Less Hassle`}</div>
            <br></br>
            <div className={styles.bodyText}>
              We offer services based around blockchain – a safer way to connect
              connect and buy. If you’re a little unsure about this new format
              and how it translates into services, here’s a brief explainer.
            </div>

            <div className={styles.subtitle}>
              <strong>What is blockchain?</strong>
            </div>
            <div className={styles.bodyText}>
              Blockchain is a technology that allows buyers and sellers to
              transact without the need for a third party. It’s a revolution in
              business. Eventually, blockchain could even replace traditional
              trading platforms altogether.
            </div>

            <div className={styles.subtitle}>
              <strong>What is Web3?</strong>
            </div>
            <div className={styles.bodyText}>
              Simply put, it1s a concept of the next stage of the internet. It’s
              a decentralized web where users control their information and
              interact directly with each other.
            </div>

            <div className={styles.subtitle}>
              <strong>
                What services does Bizflip offer based on this technology?
              </strong>
            </div>

            <div className={styles.subtitle}>
              <strong>Selling via a secure database</strong>
            </div>

            <div className={styles.bodyText}>
              Blockchain is a distributed database that allows for transparent
              and unhackable selling. This makes it an ideal technology for
              marketplace transactions, as it eliminates the need for a third
              party to verify or approve activity
            </div>

            <div className={styles.subtitle}>
              <strong>Transparent filing</strong>
            </div>

            <div className={styles.bodyText}>
              All deals get recorded on the blockchain and are viewable by
              users. This creates trust between buyers and sellers, in addition
              to making it easier to track progress.
            </div>

            <div className={styles.subtitle}>
              <strong>Low-cost transactions</strong>
            </div>
            <div className={styles.bodyText}>
              Blockchain marketplaces also offer financial and time-saving
              benefits, such as lower fees and faster interactions.
            </div>

            <div className={styles.subtitle}>
              <strong>An eagle-eye dashboard</strong>
            </div>
            <div className={styles.bodyText}>
              Log into your Bizflip account and you’ll see a comprehensive,
              user-friendly dashboard from which you can manage listings,
              respond to queries, and track progress. You’ll get the hang of it
              in no time.
            </div>

            <div className={styles.subtitle}>
              <strong>Real-time communication</strong>
            </div>
            <div className={styles.bodyText}>
              You’ll get notified quickly every time you receive a message, so
              you can catch potential customers while they’re still online. We
              also provide updates and analytics, keeping you filled in on your
              progress.
            </div>

            <Link to="/create" className={styles.exploreButton}>
              Register Now
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OurServicePage;
