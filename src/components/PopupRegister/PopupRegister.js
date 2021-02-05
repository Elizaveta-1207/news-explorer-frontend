import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function PopupRegister({ isOpen, onClose, onOverlay, changePopup, showInfoPopup, handleRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  function handleChange(evt) {
    if (evt.target.name === 'Email') {
      setEmail(evt.target.value);
    } else if (evt.target.name === 'Password') {
      setPassword(evt.target.value);
    } else if (evt.target.name === 'Name') {
      setName(evt.target.value);
    }
  }

  function resetForm() {
    setEmail('');
    setPassword('');
    setName('');
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!email) {
      console.log('Не введен email');
      return;
    }
    if (!password) {
      console.log('Не введен пароль');
      return;
    }
    if (!name) {
      console.log('Не введено имя');
      return;
    }
    handleRegister(email, password, name);
    resetForm();
  }

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} onOverlay={onOverlay}>
      <h2 className='popup__title'>Регистрация</h2>
      <form
        action='#'
        name='popup-form'
        className={`popup__form popup-login__form`}
        onSubmit={handleSubmit}
        noValidate
      >
        <p className='popup__label'>E-mail</p>
        <input
          required
          type='email'
          placeholder='Введите почту'
          name='Email'
          onChange={handleChange}
          value={email}
          className='popup__input'
        />
        <span id='email-error'> </span>
        <p className='popup__label'>Пароль</p>
        <input
          required
          type='password'
          placeholder='Введите пароль'
          name='Password'
          onChange={handleChange}
          value={password}
          className='popup__input'
        />
        <span id='password-error'></span>
        <p className='popup__label'>Имя</p>
        <input
          required
          type='text'
          placeholder='Введите своё имя'
          name='Name'
          onChange={handleChange}
          value={name}
          className='popup__input'
        />
        <span id='password-error' className='popup__error_visible popup__error_exist'>
          Такой пользователь уже есть
        </span>
        {/* <button type='submit' className='popup__button' onClick={showInfoPopup}> */}
        <button type='submit' className='popup__button'>
          Зарегистрироваться
        </button>
        <p className='popup__text'>
          или{' '}
          <span className='popup__span-text' onClick={changePopup}>
            Войти
          </span>
        </p>
      </form>
    </PopupWithForm>
  );
}

export default PopupRegister;
