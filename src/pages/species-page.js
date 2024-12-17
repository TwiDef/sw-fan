import React from 'react';
import Species from '../components/Species/Species';

const SpeciesPage = () => {

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Species />
    </>
  );
};

export default SpeciesPage;