import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormWithValidation from '../ValidateForm/ValidateForm';

function PopupLogin({ isOpen, onClose, onOverlay, changePopup, handleLogin }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(values.Email, values.Password);
  }

  React.useEffect(() => {
    resetForm();
  }, [resetForm, isOpen]);

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} onOverlay={onOverlay}>
      <h2 className='popup__title'>Вход</h2>
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
          value={values.Email || ''}
          className='popup__input'
        />
        <span id='email-error' className='popup__error_visible'>
          {errors.Email}
        </span>
        <p className='popup__label'>Пароль</p>
        <input
          required
          type='password'
          placeholder='Введите пароль'
          name='Password'
          onChange={handleChange}
          value={values.Password || ''}
          className='popup__input'
          minLength='8'
        />
        <span id='password-error' className='popup__error_visible'>
          {errors.Password}
        </span>
        <button type='submit' className='popup__button' disabled={!isValid}>
          Войти
        </button>
        <p className='popup__text'>
          или{' '}
          <span className='popup__span-text' onClick={changePopup}>
            Зарегистрироваться
          </span>
        </p>
      </form>
    </PopupWithForm>
  );
}

export default PopupLogin;
