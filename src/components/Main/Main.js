import React from 'react';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';

function Main({ location }) {
  return (
    <>
      <Preloader />
      <NewsCardList location={location} />
      <About />
    </>
  );
}

export default Main;
