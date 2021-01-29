import React from 'react';
import Header from '../Header/Header';
import SavedNews from '../SavedNews/SavedNews';

function SavedNewsPage({ location, loggedIn }) {
  return (
    <>
      <Header location={location} loggedIn={loggedIn} />
      <SavedNews location={location} />
    </>
  );
}

export default SavedNewsPage;
