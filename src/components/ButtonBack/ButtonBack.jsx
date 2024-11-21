import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ButtonBack.module.css';

const ButtonBack = () => {
  const navigate = useNavigate()
  return (
    <button className={styles.goBackBtn} onClick={() => navigate(-1)}>
      <span>&#8592; </span>go back
    </button>
  );
};

export default ButtonBack;