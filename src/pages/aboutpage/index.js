import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import ReactPlayer from 'react-player';

import HeaderActions from 'actions/header.actions';
import FilterActions from 'actions/filter.actions';
import Header from 'components/header';
import Footer from 'components/footer';

import styles from './styles.module.scss';
import LearnMore from 'components/LearnMore';

const AboutPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(HeaderActions.toggleSearchbar(false));
    dispatch(FilterActions.updateCategoryFilter(null));
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <div>
          <LearnMore />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
