import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import HeaderActions from 'actions/header.actions';
import FilterActions from 'actions/filter.actions';
import Header from 'components/header';
import Footer from 'components/footer';
import styles from './styles.module.scss';
import { StageOne, StageTwo } from './components';
import valuationConstants from 'constants/valuation.constants';

const Sell = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    formStage, // Form state
    // data: ValuationFormData,
  } = useSelector(state => state.Valuation);

  useEffect(() => {
    dispatch(HeaderActions.toggleSearchbar(false));
    dispatch(FilterActions.updateCategoryFilter(null));
  }, []);
  useEffect(() => {
    if (formStage === valuationConstants.STEP_1)
      history.replace('/get-a-valuation');
  }, [formStage]);

  const onContinueClick = () => {};
  const showForm = () => {
    switch (formStage) {
      case valuationConstants.STEP_2:
        return <StageOne onContinueClick={onContinueClick} />;
      case valuationConstants.STEP_3:
        return <StageTwo onContinueClick={onContinueClick} />;
      default:
        return '';
    }
  };

  console.log('formStage', formStage);
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <div className={styles.bodyContent}>{showForm()}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Sell;
