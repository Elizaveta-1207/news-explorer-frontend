import React from 'react';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';

function Main({
  location,
  isPrelodaerOpen,
  loggedIn,
  screenWidth,
  articles,
  firstOpen,
  handleShowMore,
  newsRow,
  saveArticle,
  savedArticles,
  handleOnAuthClick,
  keyword,
}) {
  return (
    <>
      <Preloader isPrelodaerOpen={isPrelodaerOpen} articles={articles} firstOpen={firstOpen} />
      {articles.length !== 0 && (
        <NewsCardList
          location={location}
          isPrelodaerOpen={isPrelodaerOpen}
          loggedIn={loggedIn}
          screenWidth={screenWidth}
          articles={articles}
          handleShowMore={handleShowMore}
          newsRow={newsRow}
          saveArticle={saveArticle}
          savedArticles={savedArticles}
          handleOnAuthClick={handleOnAuthClick}
          keyword={keyword}
        />
      )}
      <About />
    </>
  );
}

export default Main;
