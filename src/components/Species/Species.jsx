import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GET_SPECIES, PARAM_PAGE, BASE_IMG_URL } from '@utils/constants';
import { getApiResource } from '@utils/network';
import { getPageId, getNumFromStr } from '@utils/helpers';
import { setSpeciesList } from '@redux/slices/speciesSlice';
import { setApiStatus } from '@redux/slices/apiSlice';
import { useQueryParams } from '@hooks/useQueryParams';

import PageNavigation from '../PageNavigation/PageNavigation';
import Error from '../Error/Error';
import Loader from '../Loader/Loader';

import styles from './Species.module.css';

const Species = () => {
  const dispatch = useDispatch()
  const { speciesList } = useSelector(state => state.species)
  const { apiError } = useSelector(state => state.api)

  const [pageLoading, setPageLoading] = React.useState(false)
  const [prevPage, setPrevPage] = React.useState(null)
  const [nextPage, setNextPage] = React.useState(null)
  const [counterPage, setCounterPage] = React.useState(1)
  const queryPage = useQueryParams().get('page')

  const getSpecies = async (url) => {
    try {
      setPageLoading(true)
      const data = await getApiResource(url)
      dispatch(setSpeciesList(data.results))

      setPrevPage(data.previous)
      setNextPage(data.next)
      setCounterPage(getPageId(url))
      setPageLoading(false)
      dispatch(setApiStatus(false))
    } catch (error) {
      console.log(error.message)
      dispatch(setApiStatus(true))
    }
  }

  React.useEffect(() => {
    getSpecies(GET_SPECIES + PARAM_PAGE + queryPage)
  }, [])

  React.useEffect(() => {
    return () => {
      dispatch(setApiStatus(false))
    }
  }, [])

  return (
    <>
      <PageNavigation
        urlAddress='/species/?page='
        counterPage={counterPage}
        getRequest={getSpecies}
        prevPage={prevPage}
        nextPage={nextPage}
        pageLoading={pageLoading}
      />

      {apiError ?
        <Error /> :
        speciesList && !speciesList.length ?
          <Loader /> :
          <ul className={styles.list}>
            {speciesList && speciesList.map((race, i) =>
              <li className={styles.card} key={race + i}>
                <Link
                  to={`/species/${getNumFromStr(race.url)}`}
                  className={styles.cardLink}>
                  <div className={styles.nameBlock}>
                    <h4 className={styles.name}>{race.name}</h4>
                  </div>
                  <img
                    className={styles.img}
                    src={`${BASE_IMG_URL}/species/${getNumFromStr(race.url)}.jpg`}
                    alt="char-img" />
                </Link>
              </li>
            )}
          </ul>}
    </>
  );
};

export default Species;