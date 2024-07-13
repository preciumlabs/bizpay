import Header from 'components/header';
import React from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';
import { Grid } from '@mui/material';
import data from './data';

const Favourite = ({ nft }) => {
  console.log(nft);
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <div className={styles.main}>
          <div style={{ marginTop: '50px' }}>
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {data.map(character => (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <div className={styles.reletive}>
                      <div className={styles.inner_reletive}>
                        <img
                          className={cx(styles.card, styles.width_300)}
                          src={character.url}
                        />
                        <div
                          className={cx(styles.absolute, styles.character_name)}
                        >
                          {character.name}
                        </div>
                      </div>
                    </div>
                  </Grid>
                </>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourite;
