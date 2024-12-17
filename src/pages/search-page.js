import React from 'react';
import Search from '../components/Search/Search';

const SearchPage = () => {

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Search />
    </>
  );
};

export default SearchPage;