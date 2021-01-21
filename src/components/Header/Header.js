import React from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

function Header({ location }) {
  return (
    <header className={`header ${location.pathname === '/saved-news' ? 'header_logged' : ''}`}>
      <Link
        to='/'
        className={`header__logo ${
          location.pathname === '/saved-news' ? 'header__logo_logged' : ''
        }`}
      >
        NewsExplorer
      </Link>
      <Navigation location={location} />
    </header>
  );
}

export default Header;
