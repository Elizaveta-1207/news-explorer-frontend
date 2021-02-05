import React from 'react';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';

function Main({
  location,
  isPrelodaerOpen,
  loggedIn,
  screenWidth,
  cards,
  firstOpen,
  handleShowMore,
  newsRow,
}) {
  return (
    <>
      {!firstOpen && <Preloader isPrelodaerOpen={isPrelodaerOpen} cards={cards} />}
      {cards.length !== 0 && (
        <NewsCardList
          location={location}
          isPrelodaerOpen={isPrelodaerOpen}
          loggedIn={loggedIn}
          screenWidth={screenWidth}
          cards={cards}
          handleShowMore={handleShowMore}
          newsRow={newsRow}
        />
      )}
      <About />
    </>
  );
}

export default Main;
