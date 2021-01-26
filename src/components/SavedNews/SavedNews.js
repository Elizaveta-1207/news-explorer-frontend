import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function SavedNews({ location }) {
  return (
    <>
      <SavedNewsHeader />
      <NewsCardList location={location} />
    </>
  );
}

export default SavedNews;
