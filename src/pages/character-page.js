import React from 'react';
import Character from '../components/Character/Character';

const CharacterPage = () => {

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Character />
    </>
  );
};

export default CharacterPage;