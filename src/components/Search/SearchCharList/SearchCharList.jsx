import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './SearchCharList.module.css';

const SearchCharList = () => {
  const { searchList } = useSelector(state => state.search)

  return (
    <>
      {searchList.length ?
        <ul className={styles.charList}>
          {searchList.map(({ id, name, img }, i) => {
            return (
              <Link
                className={styles.charLink}
                to={`/characters/${id}`}
                key={i}>
                <li className={styles.char} >
                  <div className={styles.charImgWrapper}>
                    <img className={styles.charImg} src={img} alt={name} />
                  </div>
                  <h5 className={styles.charName}>{name}</h5>
                </li>
              </Link>
            )
          })}
        </ul> :
        <div className={styles.noResults}>
          <h4>Sorry, we can't find it</h4>
          <img src="https://cdn-icons-png.flaticon.com/512/2363/2363876.png" alt="not-found" />
        </div>}
    </>
  );
};

export default SearchCharList;