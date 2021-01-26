import React from 'react';

function SearchForm() {
  return (
    <>
      <form className='after-header__form' noValidate>
        <input
          type='text'
          name='request'
          placeholder='Введите тему новости'
          required
          className='after-header__input'
        />
        <button type='submit' className='after-header__btn'>
          Искать
        </button>
      </form>
    </>
  );
}

export default SearchForm;
