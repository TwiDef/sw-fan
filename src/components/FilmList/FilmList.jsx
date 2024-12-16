import React from 'react';
import { Link } from 'react-router-dom';
import { BASE_IMG_URL } from '@utils/constants';
import { getNumFromStr, getEpisodeSymbol } from '@utils/helpers';

import styles from './FilmList.module.css';

const FilmList = ({ films }) => {

  return (
    <ul className={styles.list}>
      {films && films.length > 0 ? films.map(({ url, episode_id, title }, i) => {
        return (
          <li key={i}>
            <Link className={styles.link} to={`/films/${getNumFromStr(url)}`}>
              <div className={styles.imgWrapper}>
                <img src={`${BASE_IMG_URL}/films/${getNumFromStr((url)
                  .replace("https://swapi.py4e.com/api/", ""))}.jpg`} alt="film-img" />
              </div>
              <div>
                <h5>Episode: {getEpisodeSymbol(episode_id)}</h5>
                <h6 className={styles.title}>{title}</h6>
              </div>
            </Link>
          </li>
        )
      }) : <div>Loading...</div>}
    </ul>
  );
};

export default FilmList;