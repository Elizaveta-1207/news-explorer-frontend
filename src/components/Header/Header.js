import React from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

function Header({ location, loggedIn, onAuth, signOut }) {
  return (
    <header className={`header ${location.pathname === '/saved-news' ? 'header_logged' : ''}`}>
      <div className='header__container'>
        <Link
          to='/'
          className={`header__logo ${
            location.pathname === '/saved-news' ? 'header__logo_logged' : ''
          }`}
        >
          NewsExplorer
        </Link>
        <Navigation location={location} loggedIn={loggedIn} onAuth={onAuth} signOut={signOut} />
      </div>
    </header>
  );
}

export default Header;
