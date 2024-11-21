import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getApiResource } from '@utils/network';
import { getPageId, getNumFromStr } from '@utils/helpers';
import { GET_CHARACTERS, BASE_IMG_URL, PARAM_PAGE } from '@utils/constants';
import { setChars } from '@redux/slices/charactersSlice';
import { setApiStatus } from '@redux/slices/apiSlice';
import { useQueryParams } from '@hooks/useQueryParams';

import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import PageNavigation from '../PageNavigation/PageNavigation';

import styles from './Characters.module.css';

const Characters = () => {
  const dispatch = useDispatch()
  const { charactersList } = useSelector(state => state.characters)
  const { apiError } = useSelector(state => state.api)

  const [prevPage, setPrevPage] = React.useState(null)
  const [nextPage, setNextPage] = React.useState(null)
  const [pageLoading, setPageLoading] = React.useState(false)
  const [counterPage, setCounterPage] = React.useState(1)
  const queryPage = useQueryParams().get('page')

  const getCharacters = async (url) => {
    try {
      setPageLoading(true)
      const data = await getApiResource(url)
      dispatch(setChars(data.results))

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
    getCharacters(GET_CHARACTERS + PARAM_PAGE + queryPage)
  }, [])

  React.useEffect(() => {
    return () => {
      dispatch(setApiStatus(false))
    }
  }, [])

  return (
    <>
      <PageNavigation
        urlAddress='/characters/?page='
        counterPage={counterPage}
        getRequest={getCharacters}
        prevPage={prevPage}
        nextPage={nextPage}
        pageLoading={pageLoading}
      />

      {apiError ?
        <Error /> :
        charactersList && !charactersList.length ?
          <Loader /> :
          <ul className={styles.list}>
            {charactersList && charactersList.map((character, i) =>
              <li className={styles.card} key={character + i}>
                <Link
                  to={`/characters/${getNumFromStr(character.url)}`}
                  className={styles.cardLink}>
                  <div className={styles.nameBlock}>
                    <h4 className={styles.name}>{character.name}</h4>
                  </div>
                  <img
                    className={styles.img}
                    src={`${BASE_IMG_URL}/characters/${getNumFromStr(character.url)}.jpg`}
                    alt="char-img" />
                </Link>
              </li>
            )}
          </ul>}
    </>
  )
};

export default Characters;