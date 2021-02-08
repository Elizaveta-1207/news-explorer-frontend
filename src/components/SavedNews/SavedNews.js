import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function SavedNews({ location, screenWidth, cards, savedArticles, loggedIn, saveArticle }) {
  return (
    <>
      <SavedNewsHeader savedArticles={savedArticles} />
      {savedArticles.length !== 0 && (
        <NewsCardList
          location={location}
          screenWidth={screenWidth}
          cards={cards}
          savedArticles={savedArticles}
          loggedIn={loggedIn}
          saveArticle={saveArticle}
        />
      )}
    </>
  );
}

export default SavedNews;
