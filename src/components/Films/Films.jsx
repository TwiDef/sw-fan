import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getApiResource } from '@utils/network';
import { getNumFromStr, getEpisodeSymbol } from '@utils/helpers';
import { GET_FILMS, BASE_IMG_URL } from '@utils/constants';
import { setFilms } from '@redux/slices/filmsSlice';
import { setApiStatus } from '@redux/slices/apiSlice';

import Error from '../Error/Error';
import Loader from '../Loader/Loader';

import styles from './Films.module.css';

const Films = () => {
  const dispatch = useDispatch()
  const { filmList } = useSelector(state => state.films)
  const { apiError } = useSelector(state => state.api)

  const getFilms = async (url) => {
    try {
      const data = await getApiResource(url)
      dispatch(setFilms(data.results))

      dispatch(setApiStatus(false))
    } catch (error) {
      console.log(error.message)
      dispatch(setApiStatus(true))
    }
  }

  React.useEffect(() => {
    getFilms(GET_FILMS)
  }, [])

  React.useEffect(() => {
    return () => {
      dispatch(setApiStatus(false))
    }
  }, [])

  return (
    <>
      {apiError ?
        <Error /> :
        filmList && !filmList.length ?
          <Loader /> :
          <ul className={styles.list}>
            {filmList && filmList.map((film, i) =>
              <li className={styles.card} key={film + i}>
                <Link
                  to={`/films/${getNumFromStr((film.url)
                    .replace("https://swapi.py4e.com/api/films", ""))}`}
                  className={styles.cardLink}>
                  <div className={styles.nameBlock}>
                    <h4 className={styles.name}>
                      Episode {getEpisodeSymbol(film.episode_id)}: {film.title}
                    </h4>
                  </div>
                  <img
                    className={styles.img}
                    src={`${BASE_IMG_URL}/films/${getNumFromStr((film.url)
                      .replace("https://swapi.py4e.com/api/films", ""))}.jpg`}
                    alt="film-img" />
                </Link>
              </li>
            )}
          </ul>}
    </>
  );
};

export default Films;