import React from 'react';
import Race from '../components/Race/Race';

const RacePage = () => {

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Race />
    </>
  );
};

export default RacePage;