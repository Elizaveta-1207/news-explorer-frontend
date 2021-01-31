import React from 'react';
import Header from '../Header/Header';
import SavedNews from '../SavedNews/SavedNews';

function SavedNewsPage({ location, loggedIn, signOut, isBurgerOpen, openBurger, screenWidth }) {
  return (
    <>
      <Header
        location={location}
        loggedIn={loggedIn}
        signOut={signOut}
        isBurgerOpen={isBurgerOpen}
        openBurger={openBurger}
        screenWidth={screenWidth}
      />
      <SavedNews location={location} screenWidth={screenWidth} />
    </>
  );
}

export default SavedNewsPage;
