import React from 'react';
import Characters from '../components/Characters/Characters';

const CharactersPage = () => {

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Characters />
    </>
  );
};

export default CharactersPage;