import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import News from '../../utils/News.json';

function NewsCardList({ location }) {
  return (
    <section className={`news ${location.pathname === '/saved-news' && 'news_saved'}`}>
      <div className='news__container'>
        {location.pathname === '/' && <h2 className='news__title'>Результаты поиска</h2>}
        <ul className={`news__list ${location.pathname === '/saved-news' && 'news__list_saved'}`}>
          {News.articles.map((props) => (
            <NewsCard
              key={props.source.id}
              id={props.source.id}
              name={props.source.name}
              {...props}
              location={location}
            />
          ))}
        </ul>
        {location.pathname === '/' && <button className='news__show-btn'>Показать еще</button>}
      </div>
    </section>
  );
}

export default NewsCardList;
