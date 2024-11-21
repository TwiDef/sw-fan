import React from 'react';

import styles from './Error.module.css';

const Error = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.number}>4</div>
        <img
          className={styles.img}
          src="https://cdn-icons-png.flaticon.com/512/361/361680.png" alt="error-msg" />
        <div className={styles.number}>4</div>
      </div>
      <h3 className={styles.title}>You lost your own way, my son!</h3>
    </div>
  );
};

export default Error;