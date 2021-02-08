import React from 'react';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList({
  location,
  isPrelodaerOpen,
  loggedIn,
  screenWidth,
  articles,
  handleShowMore,
  newsRow,
  saveArticle,
  savedArticles,
  handleOnAuthClick,
  keyword,
}) {
  const showNewsRows = location.pathname === '/' && articles.slice(0, (newsRow + 1) * 3);
  return (
    <>
      {!isPrelodaerOpen && (
        <section className={`news ${location.pathname === '/saved-news' && 'news_saved'}`}>
          <div
            className={`news__container ${
              location.pathname === '/saved-news' && 'news__container_saved'
            }`}
          >
            {location.pathname === '/' && <h2 className='news__title'>Результаты поиска</h2>}
            <ul
              className={`news__list ${location.pathname === '/saved-news' && 'news__list_saved'}`}
            >
              {location.pathname === '/' &&
                showNewsRows.map((props, index) => (
                  <NewsCard
                    key={index}
                    name={props.source.name}
                    {...props}
                    location={location}
                    loggedIn={loggedIn}
                    screenWidth={screenWidth}
                    saveArticle={saveArticle}
                    savedArticles={savedArticles}
                    handleOnAuthClick={handleOnAuthClick}
                    keyword={keyword}
                  />
                ))}
              {location.pathname === '/saved-news' &&
                savedArticles.map((props, index) => (
                  <NewsCard
                    key={index}
                    name={props.source}
                    title={props.title}
                    description={props.text}
                    url={props.link}
                    urlToImage={props.image}
                    publishedAt={props.date}
                    keyword={props.keyword}
                    location={location}
                    loggedIn={loggedIn}
                    screenWidth={screenWidth}
                    saveArticle={saveArticle}
                    savedArticles={savedArticles}
                    handleOnAuthClick={handleOnAuthClick}
                  />
                ))}
            </ul>
            {location.pathname === '/' && (
              <button className='news__show-btn' onClick={handleShowMore}>
                Показать еще
              </button>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default NewsCardList;
