import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function SavedNews({ location, screenWidth, cards }) {
  return (
    <>
      <SavedNewsHeader />
      <NewsCardList location={location} screenWidth={screenWidth} cards={cards} />
    </>
  );
}

export default SavedNews;
