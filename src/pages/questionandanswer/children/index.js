import Footer from 'components/footer';
import Header from 'components/header';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import styles from './styles.module.scss';
import cx from 'classnames';
import { Box, MobileStepper } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import HeaderActions from 'actions/header.actions';
import { useDispatch } from 'react-redux';
import ModalActions from 'actions/modal.actions';
import { components } from 'react-select';
import { default as ReactSelect } from 'react-select';
// import { Slider } from 'rsuite';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';

const steps = [
  {
    label: 'What type of assets are you interested in?',
  },
  {
    label: 'What price range are you looking to acquire at?',
  },
  {
    label: 'Do you promise to act in good faith?',
  },
];

const myData = [
  { value: 0, label: 'Blockchain' },
  { value: 1, label: 'Brick & Mortar' },
  { value: 2, label: 'Ecommerce' },
  { value: 3, label: 'Hybrid' },
];

const Option = props => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{' '}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const QnA = () => {
  const questionRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeStepProcess, setActiveStepProcess] = useState(0);
  const [answer1, setAnswer1] = useState([]);
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [answer3, setAnswer3] = useState();
  const { account } = useWeb3React();

  const handleNextProcess = () => {
    if (account === undefined) {
      dispatch(ModalActions.showConnectWalletModal());
    } else {
      if (activeStepProcess === 0) {
        if (answer1.length === 0) {
          return;
        }
      }
      if (activeStepProcess === 1) {
        if (!min || !max) {
          return;
        }
      }
      console.log('activeStepProcess', activeStepProcess);
      if (activeStepProcess === 2) {
        console.log('answer3', answer3);
        if (!answer3) {
          return;
        }

        history.push({
          pathname: '/nft-swipe',
          state: {
            _types: answer1,
            _min: min,
            _max: max,
            _res: answer3,
          },
        });
        return;
      }
      setActiveStepProcess(prevActiveStep => prevActiveStep + 1);
      questionRef.current.className = styles.question_answer_goneRight;
      setTimeout(() => {
        questionRef.current.className = styles.question_answer_right;
      }, 400);
    }
  };

  const handleBackProcess = () => {
    setActiveStepProcess(prevActiveStep => prevActiveStep - 1);
    questionRef.current.className = styles.question_answer_goneLeft;
    setTimeout(() => {
      questionRef.current.className = styles.question_answer_left;
    }, 400);
  };

  // const [isDisabled, setIsDisabled] = useState(true);

  // const handlClick = () => {
  //   if (answer1 !== '' && answer2 !== '' && answer3 !== '') {
  //     setIsDisabled(false);
  //   } else {
  //     setIsDisabled(true);
  //   }
  // };

  useEffect(() => {
    dispatch(HeaderActions.toggleSearchbar(false));
  }, []);

  const handleChange = event => {
    setAnswer3(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <MobileStepper
          className={`${styles.bg_transpernt} ${styles.bg_liner}`}
          variant="progress"
          steps={3}
          position="static"
          activeStep={activeStepProcess}
          sx={{
            flexGrow: 1,
            justifyContent: 'center',
            height: '100px',
            '& .css-5xe99f-MuiLinearProgress-bar1': {
              backgroundImage:
                'linear-gradient(135deg, #3F5EFB 50%, #FC466B 100%)',
            },
            '& .css-1gx4x9t-MuiLinearProgress-root-MuiMobileStepper-progress': {
              height: '12px',
              borderRadius: '10px',
              width: '100%',
            },
            '&. MuiMobileStepper-progress': {
              height: '12px',
              borderRadius: '10px',
              width: '100%',
            },
          }}
        />
        <div className={styles.main}>
          <Box sx={{ flexGrow: 1 }}>
            <div className={styles.mainLeft}>
              <div className={styles.textContainer}>
                <div ref={questionRef} className={styles.question_answer_right}>
                  <div
                    className={styles.bodyText}
                    style={{ marginTop: '50px' }}
                  >
                    {steps[activeStepProcess].label}
                  </div>
                  {activeStepProcess === 0 ? (
                    <ReactSelect
                      options={myData}
                      isMulti
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                      components={{
                        Option,
                      }}
                      onChange={e => setAnswer1(e)}
                      allowSelectAll={true}
                      value={answer1}
                      className={styles.dropdownmemue}
                    />
                  ) : activeStepProcess === 1 ? (
                    // <div className={styles.sliderbar}>
                    //   <Slider
                    //     min={0}
                    //     max={labels.length - 1}
                    //     value={answer2}
                    //     graduated
                    //     tooltip={false}
                    //     handleTitle={labels[answer2]}
                    //     onChange={setAnswer2}
                    //   />
                    // </div>
                    <>
                      <input
                        name="answer2"
                        type="text"
                        className={cx(styles.formInput)}
                        placeholder="Enter Min value"
                        value={min}
                        onChange={e => setMin(e.target.value)}
                      />
                      <input
                        name="answer2"
                        type="text"
                        className={cx(styles.formInput)}
                        placeholder="Enter Max value"
                        value={max}
                        onChange={e => setMax(e.target.value)}
                      />
                    </>
                  ) : (
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={answer3}
                        onChange={handleChange}
                      >
                        <div className={styles.yes_no}>
                          <FormControlLabel
                            value="Yes"
                            control={<Radio color="default" />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="No"
                            control={<Radio color="default" />}
                            label="No"
                          />
                        </div>
                      </RadioGroup>
                    </FormControl>
                  )}
                </div>
              </div>
              <div
                className={styles.flex}
                style={{
                  marginTop: '50px',
                  justifyContent: 'center',
                  gap: '10px',
                }}
              >
                {activeStepProcess !== 0 && (
                  <button
                    className={cx(styles.button)}
                    type="submit"
                    onClick={handleBackProcess}
                    disabled={activeStepProcess === 0}
                  >
                    <WestIcon fontSize="large" />
                  </button>
                )}
                {activeStepProcess !== 2 && (
                  <button
                    className={cx(styles.button)}
                    type="submit"
                    onClick={() => {
                      handleNextProcess();
                    }}
                    disabled={activeStepProcess === 2}
                  >
                    <EastIcon fontSize="large" />
                  </button>
                )}
              </div>
            </div>
          </Box>
        </div>
        {activeStepProcess === 2 ? (
          <button
            className={cx(styles.button, styles.mx_auto)}
            type="button"
            onClick={() => {
              handleNextProcess();
            }}
          >
            Next
          </button>
        ) : (
          <></>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default QnA;
