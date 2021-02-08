import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormWithValidation from '../ValidateForm/ValidateForm';

function PopupLogin({ isOpen, onClose, onOverlay, changePopup, handleLogin }) {
  //   const [email, setEmail] = React.useState('');
  //   const [password, setPassword] = React.useState('');

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  //   console.log(values);
  //   console.log(errors);

  // подготовка к валидации
  //   const [errors, setErrors] = React.useState({
  //     emailErr: '',
  //     passwordErr: '',
  //   });
  //   const [isValid, setIsValid] = React.useState(true);
  //   const [showError, setShowError] = React.useState({});

  //   function handleChange(evt) {
  //     if (evt.target.name === 'Email') {
  //       setEmail(evt.target.value);
  //     } else if (evt.target.name === 'Password') {
  //       setPassword(evt.target.value);
  //     }
  //   }

  //   function resetForm() {
  //     setEmail('');
  //     setPassword('');
  //     setErrors({
  //       emailErr: '',
  //       passwordErr: '',
  //     });
  //   }

  function handleSubmit(evt) {
    evt.preventDefault();
    // if (!email) {
    //   console.log('Не введен email');
    //   return;
    // }
    // if (!password) {
    //   console.log('Не введен пароль');
    //   return;
    // }
    // handleLogin(email, password);
    handleLogin(values.Email, values.Password);
    // resetForm();
    // console.log(values);
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
          //   onChange={handleChange}
          onChange={handleChange}
          //   value={email}
          value={values.Email || ''}
          className='popup__input'
        />
        <span id='email-error' className='popup__error_visible'>
          {/* Неправильный формат email */}
          {errors.Email}
        </span>
        <p className='popup__label'>Пароль</p>
        <input
          required
          type='password'
          placeholder='Введите пароль'
          name='Password'
          onChange={handleChange}
          //   value={password}
          value={values.Password || ''}
          className='popup__input'
          minLength='8'
        />
        <span id='password-error' className='popup__error_visible'>
          {errors.Password}
        </span>
        {/* поставить disabled для деактивации кнопки */}
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
