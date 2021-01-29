import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function PopupInfo({ isOpen, onClose, onOverlay, changePopup }) {
  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} onOverlay={onOverlay}>
      <h2 className='popup__title'>Пользователь успешно зарегистрирован!</h2>
      <p className='popup__text-login' onClick={changePopup}>
        Войти
      </p>
    </PopupWithForm>
  );
}

export default PopupInfo;
