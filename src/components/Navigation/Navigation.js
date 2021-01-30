import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ location, loggedIn, onAuth, signOut }) {
  return (
    <>
      <button className='header__burger'></button>
      <nav className='header__nav'>
        <Link
          to='/'
          className={`header__link ${
            location.pathname === '/saved-news' ? 'header__link_logged' : ''
          } ${location.pathname === '/' ? 'header__link_selected_main' : ''}`}
        >
          Главная
        </Link>
        {loggedIn && (
          <Link
            to='/saved-news'
            className={`header__link header__link_hidden ${
              location.pathname === '/saved-news'
                ? 'header__link_logged header__link_selected_saved'
                : ''
            }`}
          >
            Сохраненные статьи
          </Link>
        )}
        <Link
          to='/'
          onClick={loggedIn ? signOut : onAuth}
          className={`header__link header__link_auth ${
            location.pathname === '/saved-news'
              ? 'header__link_logged header__link_auth_logged'
              : ''
          }`}
        >
          <p className='header__item'>{loggedIn ? 'Елизавета' : 'Авторизоваться'}</p>
          {loggedIn && (
            <svg
              className='header__logout'
              width='18'
              height='16'
              viewBox='0 0 18 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                className={`header__path ${
                  location.pathname === '/saved-news' ? 'header__path_logged' : ''
                }`}
                fillRule='evenodd'
                clipRule='evenodd'
                d='M6 2L2 2L2 14H6V16H2C0.89543 16 0 15.1046 0 14V2C0 0.89543 0.895432 0 2 0H6V2ZM13.5856 9.00002L9.29274 13.1339L10.707 14.4958L17.4141 8.03706L10.707 1.57837L9.29274 2.9402L13.5856 7.0741H4V9.00002H13.5856Z'
                fill='red'
              />
            </svg>
          )}
        </Link>
      </nav>
    </>
  );
}

export default Navigation;
