import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormWithValidation from '../ValidateForm/ValidateForm';

function PopupRegister({
  isOpen,
  onClose,
  onOverlay,
  changePopup,
  handleRegister,
  registerError,
  resetRegisterError,
}) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function changeInput(evt) {
    handleChange(evt);
    resetRegisterError();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(values.Email, values.Password, values.Name);
  }

  React.useEffect(() => {
    resetForm();
  }, [resetForm, isOpen]);

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
          onChange={changeInput}
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
        <p className='popup__label'>Имя</p>
        <input
          required
          type='text'
          placeholder='Введите своё имя'
          name='Name'
          onChange={handleChange}
          value={values.Name || ''}
          className='popup__input'
          minLength='2'
        />
        <span id='name-error' className='popup__error_visible'>
          {errors.Name}
        </span>
        {registerError && (
          <div id='user-error' className='popup__error_visible popup__error_exist'>
            Такой пользователь уже есть
          </div>
        )}
        <button type='submit' className='popup__button' disabled={!isValid}>
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
