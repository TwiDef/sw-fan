import React from 'react';
import { Link } from 'react-router-dom';
import { BASE_IMG_URL } from '@utils/constants';
import { getNumFromStr, getEpisodeSymbol } from '@utils/helpers';

import styles from './CharList.module.css';

const CharList = ({ chars }) => {

  return (
    <ul className={styles.list}>
      {chars && chars.length > 0 ? chars.map(({ url, name }, i) => {
        return (
          <li key={i}>
            <Link className={styles.link} to={`/characters/${getNumFromStr(url)}`}>
              <div className={styles.imgWrapper}>
                <img src={`${BASE_IMG_URL}/characters/${getNumFromStr(url)}.jpg`} alt="race-img" />
              </div>
              <div>
                <h6 className={styles.title}>{name}</h6>
              </div>
            </Link>
          </li>
        )
      }) : <div>Loading...</div>}
    </ul>
  );
};

export default CharList;