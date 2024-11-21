import React from 'react';
import { Link } from 'react-router-dom';

import styles from './PageNavigation.module.css';

const PageNavigation = ({ urlAddress, counterPage, getRequest, prevPage, nextPage, pageLoading }) => {

  return (
    <div className={styles.wrapper}>
      <Link
        to={`${urlAddress}${counterPage - 1}`}
        onClick={() => getRequest(prevPage)}>
        <button className={styles.btn}
          disabled={!prevPage || pageLoading ? true : false}>
          prev
        </button>
      </Link>

      <Link
        to={`${urlAddress}${counterPage + 1}`}
        onClick={() => getRequest(nextPage)}>
        <button className={styles.btn}
          disabled={!nextPage || pageLoading ? true : false}>
          next
        </button>
      </Link>
    </div>
  );
};

export default PageNavigation;