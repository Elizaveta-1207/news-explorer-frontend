import React from 'react';

function SearchForm({ handleSearch }) {
  const [value, setValue] = React.useState('');

  function handleChange(evt) {
    setValue(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (value !== '') {
      handleSearch(value);
      setValue('');
    }
  }

  return (
    <>
      <form className='after-header__form' onSubmit={handleSubmit} noValidate>
        <input
          type='text'
          name='request'
          placeholder='Введите тему новости'
          value={value}
          required
          className='after-header__input'
          onChange={handleChange}
        />
        <button type='submit' className='after-header__btn'>
          Искать
        </button>
      </form>
    </>
  );
}

export default SearchForm;
