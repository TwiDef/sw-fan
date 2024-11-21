import React from 'react';

import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <p className={styles.themeFontFirst}>star</p>
        <h6 className={styles.title}>a visual guide</h6>
        <p className={styles.themeFontSecond}>wars</p>
      </div>
    </div>
  );
};

export default Home;