import React from 'react';
import SearchForm from '../SearchForm/SearchForm';

function AfterHeader({ handleSearch }) {
  return (
    <div className='after-header'>
      <h1 className='after-header__title'>Что творится в мире?</h1>
      <p className='after-header__text'>
        Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.
      </p>
      <SearchForm handleSearch={handleSearch} />
    </div>
  );
}

export default AfterHeader;
