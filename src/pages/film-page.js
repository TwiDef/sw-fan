import React from 'react';
import Film from '../components/Film/Film';

const FilmPage = () => {

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Film />
    </>
  );
};

export default FilmPage;