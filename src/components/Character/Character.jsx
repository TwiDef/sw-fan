import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleChar, addToFavorites } from '@redux/slices/charactersSlice';
import { setApiStatus } from '@redux/slices/apiSlice';
import { getApiResource, getApiResources } from '@utils/network';
import { GET_CHARACTERS, BASE_IMG_URL } from '@utils/constants';
import { getNumFromStr } from '@utils/helpers';

import like_active from '@assets/img/like_active.png';
import like_disactive from '@assets/img/like_disactive.png';

import Error from '../Error/Error';
import Loader from '../Loader/Loader';
import FilmList from '../FilmList/FilmList';
import ButtonBack from '../ButtonBack/ButtonBack';

import styles from './Character.module.css';

const Character = () => {
  const dispatch = useDispatch()
  const { singleCharacter, favorites } = useSelector(state => state.characters)
  const { apiError } = useSelector(state => state.api)
  const [charInfo, setCharInfo] = React.useState(null)
  const [films, setFilms] = React.useState([])
  const [likeStatus, setLikeStatus] = React.useState(false)
  const params = useParams()
  const id = params.id

  const getCharacter = async (url) => {
    try {
      const data = await getApiResource(url)
      if (!data) {
        dispatch(setApiStatus(true))
      } else {
        dispatch(setSingleChar(data))
        setCharInfo([
          { property: 'height', evidence: data.height },
          { property: 'mass', evidence: data.mass },
          { property: 'hair color', evidence: data.hair_color },
          { property: 'skin color', evidence: data.skin_color },
          { property: 'eye color', evidence: data.eye_color },
          { property: 'birth year', evidence: data.birth_year },
          { property: 'gender', evidence: data.gender }
        ])
        dispatch(setApiStatus(false))
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const toggleToFavorites = () => {
    dispatch(addToFavorites(singleCharacter))
  }

  React.useEffect(() => {
    if (singleCharacter) {
      (favorites.find(char => char.name === singleCharacter.name))
        ? setLikeStatus(true)
        : setLikeStatus(false)
    }
  }, [favorites, singleCharacter])

  React.useEffect(() => {
    getCharacter(GET_CHARACTERS + id)
    return () => {
      dispatch(setSingleChar(null))
    }
  }, [id])

  React.useEffect(() => {
    if (singleCharacter) {
      getApiResources(singleCharacter.films)
        .then(films => setFilms(films))
    }
  }, [singleCharacter])

  return (
    <>
      {apiError ? <Error /> :
        singleCharacter ?
          <>
            <div className={styles.wrapper}>
              <div className={styles.infoTop}>
                <div className={styles.image}>
                  <h2 className={styles.title}>{singleCharacter.name}</h2>
                  <button className={styles.like} onClick={toggleToFavorites}>
                    <img
                      src={likeStatus ? like_active : like_disactive} alt="like-img" />
                  </button>
                  <img
                    className={styles.photo}
                    src={`${BASE_IMG_URL}/characters/${id}.jpg`}
                    alt="char-img" />
                </div>
                <div className={styles.info}>
                  <h2 className={styles.infoTitle}>Info</h2>
                  <ul className={styles.infoList}>
                    {charInfo && (
                      charInfo.map(({ property, evidence }, i) => {
                        return (
                          <li key={i}>
                            <h4 className={styles.propertyTitle}>{property}: </h4><p>{evidence}</p>
                            {property === 'height' ? ' cm' : ''}
                            {property === 'mass' ? ' kg' : ''}
                          </li>)
                      })
                    )}
                  </ul>
                </div>
              </div>

              <div className={styles.filmInfo}>
                <h2 className={styles.filmTitle}>Related Films</h2>
                <FilmList films={films} />
              </div>
            </div>

            <ButtonBack />
          </>
          : <Loader />}
    </>
  );
};

export default Character;