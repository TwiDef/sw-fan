import React from 'react';
import Favorites from '../components/Favorites/Favorites';

const FavoritesPage = () => {

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Favorites />
    </>
  );
};

export default FavoritesPage;