import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getApiResource } from '@utils/network';
import { setSingleFilm } from '@redux/slices/filmsSlice';
import { setApiStatus } from '@redux/slices/apiSlice';
import { GET_FILMS, BASE_IMG_URL } from '@utils/constants';
import { getNumFromStr, getEpisodeSymbol } from '@utils/helpers';

import Error from '../Error/Error';
import Loader from '../Loader/Loader';
import ButtonBack from '../ButtonBack/ButtonBack';

import styles from './Film.module.css';

const Film = () => {
  const dispatch = useDispatch()
  const { singleFilm } = useSelector(state => state.films)
  const { apiError } = useSelector(state => state.api)
  const params = useParams()
  const filmId = params.id

  const getFilm = async (url) => {
    try {
      const data = await getApiResource(url)
      dispatch(setSingleFilm(data))

      dispatch(setApiStatus(false))
    } catch (error) {
      console.log(error.message)
      dispatch(setApiStatus(true))
    }
  }

  React.useEffect(() => {
    getFilm(`${GET_FILMS}/${filmId}`)
  }, [])

  React.useEffect(() => {
    return () => {
      dispatch(setSingleFilm(null))
      dispatch(setApiStatus(false))
    }
  }, [])

  if (apiError) {
    return <Error />
  }

  return (
    <>
      {
        !singleFilm ?
          <Loader /> :
          <div className={styles.wrapper}>
            <div className={styles.poster}>
              <img src={`${BASE_IMG_URL}/films/${getNumFromStr(singleFilm.url)}.jpg`} alt="film-poster" />
            </div>
            <div className={styles.info}>
              <h3 className={styles.title}>
                Episode {getEpisodeSymbol(singleFilm.episode_id)}: {singleFilm.title}
              </h3>
              <div className={styles.desctiption}>
                <p><span>Release date: </span>{singleFilm.release_date}</p>
                <p><span>Director: </span>{singleFilm.director}</p>
                <p><span>Producer(s): </span>{singleFilm.producer}</p>
                <p><span>Description: </span><br />
                  <p className={styles.text}>{singleFilm.opening_crawl}</p>
                </p>
              </div>
              <div style={{ "marginTop": "auto" }}><ButtonBack /></div>
            </div>
          </div>
      }
    </>
  );
};

export default Film;