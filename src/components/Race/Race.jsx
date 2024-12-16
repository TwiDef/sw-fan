import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getApiResource, getApiResources } from '@utils/network';
import { getNumFromStr } from '@utils/helpers';
import { GET_SPECIES, BASE_IMG_URL } from '@utils/constants';
import { setApiStatus } from '@redux/slices/apiSlice';
import { setRace } from '@redux/slices/speciesSlice';

import CharList from '../CharList/CharList';
import Error from '../Error/Error';
import ButtonBack from '../ButtonBack/ButtonBack';
import Loader from '../Loader/Loader';

import styles from './Race.module.css';

const Race = () => {
  const dispatch = useDispatch()
  const { race } = useSelector(state => state.species)
  const { apiError } = useSelector(state => state.api)
  const [chars, setChars] = React.useState([])
  const [raceInfo, setRaceInfo] = React.useState(null)
  const params = useParams()
  const id = params.id

  const getRace = async (url) => {
    try {
      const data = await getApiResource(url)

      if (!data) {
        dispatch(setApiStatus(true))
      } else {
        dispatch(setRace(data))
        setRaceInfo([
          { property: 'classification', evidence: data.classification },
          { property: 'designation', evidence: data.designation },
          { property: 'average height', evidence: data.average_height },
          { property: 'skin colors', evidence: data.skin_colors },
          { property: 'eye colors', evidence: data.eye_colors },
          { property: 'hair colors', evidence: data.hair_colors },
          { property: 'average lifespan', evidence: data.average_lifespan }
        ])
        dispatch(setApiStatus(false))
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  React.useEffect(() => {
    getRace(GET_SPECIES + id)
    return () => {
      dispatch(setRace(null))
    }
  }, [id])

  React.useEffect(() => {
    if (race) {
      getApiResources(race.people)
        .then(people => setChars(people))
    }
  }, [race])

  return (
    <>
      {apiError ? <Error /> :
        race ?
          <>
            <div className={styles.wrapper}>
              <div className={styles.infoTop}>
                <div className={styles.image}>
                  <h2 className={styles.title}>{race.name}</h2>
                  <img
                    className={styles.photo}
                    src={`${BASE_IMG_URL}/species/${id}.jpg`}
                    alt="char-img" />
                </div>
                <div className={styles.info}>
                  <h2 className={styles.infoTitle}>Info</h2>
                  <ul className={styles.infoList}>
                    {raceInfo && (
                      raceInfo.map(({ property, evidence }, i) => {
                        return (
                          <li key={i}>
                            <h4 className={styles.propertyTitle}>{property}: </h4><p>{evidence}</p>
                            {property === 'average height' ? ' cm' : ''}
                            {property === 'average lifespan' ? ' years' : ''}
                          </li>)
                      })
                    )}
                  </ul>
                </div>
              </div>

              <div className={styles.CharInfo}>
                <h2 className={styles.CharTitle}>Related Characters</h2>
                <CharList chars={chars} />
              </div>
            </div>

            <ButtonBack />
          </>
          : <Loader />}
    </>
  );

  /* return (
    <>
      {apiError ? <Error /> :
        race ?
          <>
            <div className={styles.wrapper}>
              <div className={styles.image}>
                <h2 className={styles.title}>{race.name}</h2>
                <img
                  src={`${BASE_IMG_URL}/species/${getNumFromStr(race.url)}.jpg`}
                  alt="race-img" />
              </div>
              <div className={styles.info}>
                <h2 className={styles.infoTitle}>Info</h2>
                <ul className={styles.infoList}>
                  {raceInfo && (
                    raceInfo.map(({ property, evidence }, i) => {
                      return (
                        <li key={i}>
                          <h4>{property}: </h4>{evidence}
                          {property === 'average height' ? ' cm' : ''}
                          {property === 'average lifespan' ? ' years' : ''}
                        </li>)
                    })
                  )}
                </ul>
              </div>
              <div className={styles.charInfo}>
                <h2 className={styles.charTitle}>Related Characters</h2>
                <CharList chars={chars} />
              </div>
            </div>

            <ButtonBack />
          </>
          : <Loader />}
    </>
  ); */
};

export default Race;