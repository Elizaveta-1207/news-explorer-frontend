import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function SavedNews({ location, screenWidth }) {
  return (
    <>
      <SavedNewsHeader />
      <NewsCardList location={location} screenWidth={screenWidth} />
    </>
  );
}

export default SavedNews;
