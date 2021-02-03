import React from 'react';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';

function Main({ location, isPrelodaerOpen, loggedIn, screenWidth, cards }) {
  return (
    <>
      <Preloader isPrelodaerOpen={isPrelodaerOpen} />
      <NewsCardList
        location={location}
        isPrelodaerOpen={isPrelodaerOpen}
        loggedIn={loggedIn}
        screenWidth={screenWidth}
        cards={cards}
      />
      <About />
    </>
  );
}

export default Main;
