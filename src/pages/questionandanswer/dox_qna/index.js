import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from 'components/header';
import toast from 'utils/toast';
// import { NavLink } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { useApi } from 'api';
function Dox() {
  const history = useHistory();
  const { account } = useWeb3React();
  const { apiUrl } = useApi();
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [hasEmail, setHasEmail] = useState(true);
  const [hasPhone, setHasPhone] = useState(true);
  const [hasFile, setHasFile] = useState(true);
  const { authToken } = useSelector(state => state.ConnectWallet);
  const [selectedFile, setSelectedFile] = useState();
  const [isValid, setIsValid] = useState(true);
  const changeHandler = e => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      const reader = new FileReader();

      reader.onload = function(e) {
        setSelectedFile(e.target.result);
        setHasFile(true);
      };

      reader.readAsDataURL(file);
    }
  };

  const handlClick = async () => {
    if (!email) {
      setHasEmail(false);
      setIsValid(false);
    }
    if (!phoneNo) {
      setHasPhone(false);
      setIsValid(false);
    }
    if (!selectedFile) {
      setHasFile(false);
      setIsValid(false);
    }

    if (isValid) {
      const formData = new FormData();
      formData.append('imageFile', selectedFile);
      formData.append('phoneNo', phoneNo);
      formData.append('email', email);
      formData.append('account', account);
      console.log('formData', formData);

      const result = await axios({
        method: 'post',
        url: `${apiUrl}/account/dox`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (result.data.status === 'success') {
        toast('success', 'Your doxing request has been submitted!');
        setTimeout(() => {
          history.push('/qna');
        }, 2000);
      } else {
        toast('error', 'Something went wrong!');
      }
    }
  };
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <div className={styles.main}>
          <div className={styles.title}>
            Dox your profile with just only $0.99
          </div>
          <div className={styles.formdata}>
            <form>
              <div>
                {!hasEmail && <p>Please enter your Email</p>}
                <input
                  name="Email"
                  type="text"
                  className={styles.formInput}
                  placeholder="Enter Email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    setHasEmail(true);
                  }}
                />
              </div>
              <div>
                {!hasPhone && <p>Please enter your PhoneNumber</p>}
                <input
                  name="phoneNo"
                  type="text"
                  className={styles.formInput}
                  placeholder="Enter phone number"
                  value={phoneNo}
                  onChange={e => {
                    setPhoneNo(e.target.value);
                    setHasPhone(true);
                  }}
                />
              </div>
              <div className={styles.formFile}>
                {!hasFile && <p>Please upload your Government Issued ID</p>}
                <label htmlFor="gid" className={styles.formLabel}>
                  Government issued ID:
                </label>
                <div>
                  <input
                    type="file"
                    name="file"
                    id="gid"
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className={styles.button}>
                <button type="button" onClick={() => handlClick()}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dox;
