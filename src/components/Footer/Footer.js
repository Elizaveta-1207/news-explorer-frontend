import React from 'react';

import GhIcon from '../../images/gh-icon.png';
import FbIcon from '../../images/fb-icon.png';
import FbIcon2 from '../../images/fb-icon2.png';

function Footer({ screenWidth }) {
  return (
    <footer className='footer'>
      <p className='footer__copyright'>&copy;2020 Supersite, Powered by News API</p>
      <nav className='footer__nav'>
        <div className='footer__links'>
          <a href='/' className='footer__link'>
            Главная
          </a>
          <a
            target='_blank'
            rel='noreferrer noopener'
            href='https://praktikum.yandex.ru/'
            className='footer__link'
          >
            Яндекс.Практикум
          </a>
        </div>
        <div className='footer__socials'>
          <a
            target='_blank'
            rel='noreferrer noopener'
            href='https://github.com/Elizaveta-1207'
            className='footer__social'
          >
            <img src={GhIcon} className='footer__icon' alt='github link' />
          </a>
          <a
            target='_blank'
            rel='noreferrer noopener'
            href='https://www.facebook.com/'
            className='footer__social'
          >
            <img
              src={screenWidth < 1024 && screenWidth > 424 ? FbIcon2 : FbIcon}
              className='footer__icon'
              alt='facebook link'
            />
          </a>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
