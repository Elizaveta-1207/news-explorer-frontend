import React from 'react';

function SearchForm() {
  return (
    <>
      <form className='main__form' noValidate>
        <input
          type='text'
          name='request'
          placeholder='Введите тему новости'
          required
          className='main__input'
        />
        <button type='submit' className='main__btn'>
          Искать
        </button>
      </form>
    </>
  );
}

export default SearchForm;
