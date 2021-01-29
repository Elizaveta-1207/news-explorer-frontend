import React from 'react';

function PopupWithForm({ isOpen, onClose, children, onOverlay }) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} onClick={onOverlay}>
      <div className='popup__container'>
        <button
          aria-label='Закрыть'
          type='button'
          className='popup__close-button'
          onClick={onClose}
        ></button>
        {children}
      </div>
    </div>
  );
}

export default PopupWithForm;
