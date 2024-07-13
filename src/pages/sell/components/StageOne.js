import React from 'react';
import { Card, FormControl, MenuItem, Select } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import {
  HiOutlineCog8Tooth,
  HiOutlineDocumentText,
  HiShoppingCart,
} from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import styles from './../styles.module.scss';
import { BsShopWindow } from 'react-icons/bs';
import { AiFillCloud } from 'react-icons/ai';
import { GiArrowCursor } from 'react-icons/gi';
import ValuationActions from 'actions/valuation.action';
import { useState } from 'react';
const categories = [
  {
    icon: <HiShoppingCart />,
    label: 'Ecommerce',
    value: 'ecommerce',
    desc: '',
  },
  {
    icon: <HiOutlineDocumentText />,
    label: 'Content',
    value: 'content',
    desc: '',
  },
  {
    icon: <BsShopWindow />,
    label: 'Market',
    value: 'market',
    desc: '',
  },
  {
    icon: <AiFillCloud />,
    label: 'SaaS',
    value: 'saas',
    desc: '',
  },
  {
    icon: <HiOutlineCog8Tooth />,
    label: 'Service',
    value: 'service',
    desc: '',
  },
  {
    icon: <GiArrowCursor />,
    label: 'Domain',
    value: 'domain',
    desc: '',
    // eslint-disable-next-line prettier/prettier
  }
];
const categoryOptions = [
  { value: '', label: 'Selling something else?' },
  { value: 'course', label: 'Course' },
  { value: 'design-mockup', label: 'Design/Mockup' },
  { value: 'game', label: 'Game' },
  { value: 'hardware', label: 'Hardware' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'patent', label: 'Patent' },
  { value: 'pbn', label: 'PBN' },
  { value: 'plugin', label: 'Plugin' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'social-media-account', label: 'Social Media Account' },
  { value: 'template', label: 'Template' },
  // eslint-disable-next-line prettier/prettier
  { value: 'other', label: 'Other Asset' }
];
const StageOne = () => {
  const dispatch = useDispatch();
  const {
    /* formState: ValuationFormState, // Form state */
    data: ValuationFormData,
  } = useSelector(state => state.Valuation);

  const [selectedCategory, setSelectedCategory] = useState(
    ValuationFormData.category
  );

  const onCardClick = value => {
    dispatch(ValuationActions.setStageTwo(value));
  };

  const handleChangeCategory = event => {
    let value = event.target.value;
    setSelectedCategory(value);
  };

  const startOver = () => {
    dispatch(ValuationActions.resetAll());
    history.push('/get-a-valuation');
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.mainLeft}>
          <div className={styles.textContainer}>
            <div className={styles.bodyText} style={{ marginTop: '50px' }}>
              That looks like a website or domain. Choose below.
            </div>
            <div className={styles.categorySection}>
              <div className={styles.categoryContainer}>
                {categories.map((category, i) => (
                  <Card
                    className={styles.categoryCard}
                    key={i}
                    onClick={() => onCardClick(category.value)}
                  >
                    <div className={styles.cardBlock}>
                      <div className={styles.cardImage}>{category.icon}</div>
                      <div className={styles.cardLabel}>{category.label}</div>
                      <div className={styles.cardDescription}>
                        {category.desc}
                      </div>
                    </div>
                    <div className={styles.bottomBorder}></div>
                  </Card>
                ))}
              </div>
              <div>
                <FormControl className={styles.categorySectionFormControl}>
                  <Select
                    value={selectedCategory}
                    onChange={handleChangeCategory}
                    className={styles.selectBox}
                    classes={{
                      select: 'selectInner',
                      selectMenu: 'selectMenu',
                      icon: 'selectIcon',
                    }}
                    MenuProps={{
                      classes: {
                        paper: 'menuPropsPaper',
                        list: 'menuItemList',
                      },
                    }}
                    IconComponent={ExpandMoreIcon}
                  >
                    {categoryOptions.map((option, idx) => (
                      <MenuItem
                        value={option.value}
                        key={idx}
                        className="menuItem"
                        classes={{ selected: 'menuItemSelected ' }}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer actions */}
      <div className={styles.actionFooter}>
        <a onClick={startOver}>Start again</a>
        {selectedCategory && (
          <a
            onClick={() =>
              dispatch(ValuationActions.setStageTwo(selectedCategory))
            }
            className={styles.continueButton}
          >
            Continue
          </a>
        )}
      </div>
    </>
  );
};

export default StageOne;
