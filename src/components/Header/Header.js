import React from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

function Header({ location, loggedIn, onAuth, signOut, openBurger, isBurgerOpen }) {
  return (
    <header
      className={` ${
        location.pathname === '/saved-news' && !isBurgerOpen ? 'header_logged' : 'header'
      } ${isBurgerOpen && 'header__fixed'}`}
    >
      <div className={`header__container `}>
        <Link
          to='/'
          className={` header__logo ${
            location.pathname === '/saved-news' && !isBurgerOpen ? 'header__logo_logged' : ''
          }`}
        >
          NewsExplorer
        </Link>
        <Navigation
          location={location}
          loggedIn={loggedIn}
          onAuth={onAuth}
          signOut={signOut}
          openBurger={openBurger}
          isBurgerOpen={isBurgerOpen}
        />
      </div>
    </header>
  );
}

export default Header;
