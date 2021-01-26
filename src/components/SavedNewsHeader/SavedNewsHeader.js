import React from 'react';

function SavedNewsHeader() {
  return (
    <section className='news-header'>
      <p className='news-header__heading'>Сохранённые статьи</p>
      <h2 className='news-header__info'>Елизавета, у вас 5 сохранённых статей</h2>
      <p className='news-header__tags'>
        По ключевым словам: <span className='news-header__tag'>Бои</span>,{' '}
        <span className='news-header__tag'>Игры</span> и{' '}
        <span className='news-header__tag'>2-м другим</span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
