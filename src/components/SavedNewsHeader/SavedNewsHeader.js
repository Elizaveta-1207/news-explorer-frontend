import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function SavedNewsHeader({ savedArticles }) {
  const currentUser = React.useContext(CurrentUserContext);
  //   console.log(currentUser);
  return (
    <section className='news-header'>
      <p className='news-header__heading'>Сохранённые статьи</p>
      <h2 className='news-header__info'>
        {currentUser.name}, у вас {savedArticles.length === 0 ? 'пока нет' : savedArticles.length}{' '}
        сохранённых статей
      </h2>
      <p className='news-header__tags'>
        По ключевым словам: <span className='news-header__tag'>Бои</span>,{' '}
        <span className='news-header__tag'>Игры</span> и{' '}
        <span className='news-header__tag'>2-м другим</span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
