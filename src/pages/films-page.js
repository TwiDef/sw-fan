import React from 'react';
import Films from '../components/Films/Films';

const FilmsPage = () => {

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Films />
    </>
  );
};

export default FilmsPage;