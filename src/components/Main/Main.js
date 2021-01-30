import React from 'react';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';

function Main({ location, isPrelodaerOpen }) {
  return (
    <>
      <Preloader isPrelodaerOpen={isPrelodaerOpen} />
      <NewsCardList location={location} isPrelodaerOpen={isPrelodaerOpen} />
      <About />
    </>
  );
}

export default Main;
