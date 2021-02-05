import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
// import News from '../../utils/News.json';

function NewsCardList({
  location,
  isPrelodaerOpen,
  loggedIn,
  screenWidth,
  cards,
  handleShowMore,
  newsRow,
}) {
  const showNewsRows = location.pathname === '/' && cards.slice(0, (newsRow + 1) * 3);
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
              {/* {News.articles.map((props, index) => ( */}
              {showNewsRows.map((props, index) => (
                <NewsCard
                  key={index}
                  //   key={props.id}
                  //   id={props.source.id}
                  name={props.source.name}
                  {...props}
                  location={location}
                  loggedIn={loggedIn}
                  screenWidth={screenWidth}
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
