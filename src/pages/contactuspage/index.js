import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import HeaderActions from 'actions/header.actions';
import FilterActions from 'actions/filter.actions';
import toast from 'utils/toast';
import cx from 'classnames';
import Header from 'components/header';
import Footer from 'components/footer';

import styles from './styles.module.scss';
const FORM_ENDPOINT = process.env.REACT_APP_SERVER + '/contactus/sendMessage';
const ContactUsPage = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState();

  const handleSubmit = e => {
    e.preventDefault();

    // Anything you need to inject dynamically
    const injectedData = {
      DYNAMIC_DATA_EXAMPLE: 123,
    };
    const inputs = e.target.elements;
    const data = {};

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        data[inputs[i].name] = inputs[i].value;
      }
    }

    Object.assign(data, injectedData);

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        // It's likely a spam/bot request, so bypass it to validate via captcha
        if (response.status === 422) {
          Object.keys(injectedData).forEach(key => {
            const el = document.createElement('input');
            el.type = 'hidden';
            el.name = key;
            el.value = injectedData[key];

            e.target.appendChild(el);
          });

          e.target.submit();
          throw new Error('Please finish the captcha challenge');
        }

        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then(() => setStatus("We'll be in touch soon."))
      .catch(err => setStatus(err.toString()));
  };

  useEffect(() => {
    dispatch(HeaderActions.toggleSearchbar(false));
    dispatch(FilterActions.updateCategoryFilter(null));
  }, []);

  if (status) {
    toast('success', "It's submitted successfully!");
    document.getElementById('contactus').reset();
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <div className={styles.main}>
          <div className={styles.mainLeft}>
            <div className={styles.title} style={{ color: '#FFF' }}>
              Contact Us
            </div>
            <form
              action={FORM_ENDPOINT}
              onSubmit={handleSubmit}
              method="POST"
              target="_blank"
              id="contactus"
            >
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Your name"
                  name="name"
                  className={styles.formInput}
                  required
                />
              </div>
              <div className="mb-3 pt-0">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className={styles.formInput}
                  required
                />
              </div>
              <div className="mt-3 pt-0">
                <textarea
                  placeholder="Your message"
                  name="message"
                  className={cx(styles.formInput, styles.longInput)}
                  required
                />
              </div>
              <div className="mb-3 pt-0">
                <button className={cx(styles.button)} type="submit">
                  Send a message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUsPage;
