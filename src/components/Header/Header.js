import React from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

function Header() {
  return (
    <header className='header'>
      <Link to='/' className='header__logo'>
        NewsExplorer
      </Link>
      <Navigation />
    </header>
  );
}

export default Header;
