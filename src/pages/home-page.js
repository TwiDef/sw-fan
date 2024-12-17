import React from 'react';
import Home from '../components/Home/Home';

const HomePage = () => {

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Home />
    </>
  );
};

export default HomePage;