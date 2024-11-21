import React from 'react';

import styles from './SearchInput.module.css';

const SearchInput = ({ searchValue, onChangeInputValue, onClearInput }) => {
  return (
    <div className={styles.inputBox}>
      <input
        className={styles.input}
        value={searchValue}
        placeholder="type character's name"
        onChange={(e) => onChangeInputValue(e)}
        type="text" />
      <button
        className={styles.inputClearBtn}
        disabled={!searchValue && true}
        onClick={() => onClearInput()}
      >&#10060;</button>
    </div>
  );
};

export default SearchInput;