import React from 'react';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>

      <div className={styles.links}>
        <p>Follow me: </p>
        <a
          className={styles.link}
          target="_blank"
          href="https://github.com/TwiDef">
          <img
            src="https://cdn-icons-png.flaticon.com/512/11378/11378785.png"
            alt="git-link" />
          <p>GitHub</p>
        </a>
      </div>

      <p className={styles.about}>Designed and developed by TwiDef</p>
    </footer>
  );
};

export default Footer;