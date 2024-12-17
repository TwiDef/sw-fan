import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearFavorites } from '@redux/slices/charactersSlice';
import { BASE_IMG_URL } from '@utils/constants';
import { getNumFromStr } from '@utils/helpers';

import Loader from '../Loader/Loader';

import styles from './Favorites.module.css';

const Favorites = () => {
  const dispatch = useDispatch()
  const { favorites } = useSelector(state => state.characters)

  const handleClear = () => {
    const removeRequest = window.confirm('Do you wanna clear favorites list?')
    if (removeRequest) dispatch(clearFavorites())
  }

  return (
    <>
      {favorites.length ?
        (favorites && !favorites.length ?
          <Loader /> :
          <>
            <h3 className={styles.title}>your favorite characters</h3>
            <ul className={styles.list}>
              {favorites && favorites.map((character, i) =>
                <li className={styles.card} key={character + i}>
                  <Link
                    to={`/characters/${getNumFromStr((character.url)
                      .replace("https://swapi.py4e.com/api/people", ""))}`}
                    className={styles.cardLink}>
                    <div className={styles.nameBlock}>
                      <h4 className={styles.name}>{character.name}</h4>
                    </div>
                    <img
                      className={styles.img}
                      src={`${BASE_IMG_URL}/characters/${getNumFromStr((character.url)
                        .replace("https://swapi.py4e.com/api/people", ""))}.jpg`}
                      alt="char-img" />
                  </Link>
                </li>
              )}
            </ul>
            <button
              className={styles.remove}
              onClick={handleClear}>
              <h6>remove all</h6>
              <img src="https://cdn-icons-png.flaticon.com/512/17374/17374498.png" alt="remove-all" />
            </button>
          </>
        ) :
        <div className={styles.empty}>
          <div >
            <img
              src="https://cdn-icons-png.flaticon.com/512/16177/16177406.png" alt="no-char-img" />
            <h6>you haven't favorites characters</h6>
          </div>
        </div>
      }
    </>
  );
};

export default Favorites;