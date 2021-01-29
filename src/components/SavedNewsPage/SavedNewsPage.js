import React from 'react';
import Header from '../Header/Header';
import SavedNews from '../SavedNews/SavedNews';

function SavedNewsPage({ location, loggedIn, signOut }) {
  return (
    <>
      <Header location={location} loggedIn={loggedIn} signOut={signOut} />
      <SavedNews location={location} />
    </>
  );
}

export default SavedNewsPage;
