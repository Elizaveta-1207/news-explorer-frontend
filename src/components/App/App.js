import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import Header from '../Header/Header';
import AfterHeader from '../AfterHeader/AfterHeader';
import Main from '../Main/Main';
// import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedNewsPage from '../SavedNewsPage/SavedNewsPage';
import PopupLogin from '../PopupLogin/PopupLogin';
import PopupRegister from '../PopupRegister/PopupRegister';
import PopupInfo from '../PopupInfo/PopupInfo';

import './App.css';

function App() {
  const location = useLocation();
  // загатовка для авторизации пользователя
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [isPopupLoginOpen, setIsPopupLoginOpen] = React.useState(false);
  const [isPopupRegisterOpen, setIsPopupRegisterOpen] = React.useState(false);
  const [isPopupInfoOpen, setIsPopupInfoOpen] = React.useState(false);

  function handleOnAuthClick() {
    setIsPopupLoginOpen(true);
  }

  //   function openPopupLogin() {
  //     setIsPopupLoginOpen(true);
  //   }
  //   function openPopupRegister() {
  //     setIsPopupRegisterOpen(true);
  //   }
  function openPopupInfo() {
    setIsPopupInfoOpen(true);
    setIsPopupRegisterOpen(false);
  }

  function closeAllPopups() {
    setIsPopupLoginOpen(false);
    setIsPopupRegisterOpen(false);
    setIsPopupInfoOpen(false);
  }

  function handleOnOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  function changePopup(evt) {
    closeAllPopups();
    evt.target.textContent === 'Зарегистрироваться'
      ? setIsPopupRegisterOpen(true)
      : setIsPopupLoginOpen(true);
  }

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  });

  return (
    <>
      <div className='page'>
        <Switch>
          <Route exact path='/'>
            <div className='page__container'>
              <Header location={location} loggedIn={loggedIn} onAuth={handleOnAuthClick} />
              <AfterHeader />
            </div>
            <Main location={location} />
          </Route>
          <ProtectedRoute
            path='/saved-news'
            component={SavedNewsPage}
            location={location}
            loggedIn={loggedIn}
          />
        </Switch>
        <Footer />

        <PopupLogin
          isOpen={isPopupLoginOpen}
          onClose={closeAllPopups}
          onOverlay={handleOnOverlayClick}
          changePopup={changePopup}
        />

        <PopupRegister
          isOpen={isPopupRegisterOpen}
          onClose={closeAllPopups}
          onOverlay={handleOnOverlayClick}
          changePopup={changePopup}
          showInfoPopup={openPopupInfo}
        />

        <PopupInfo
          isOpen={isPopupInfoOpen}
          onClose={closeAllPopups}
          onOverlay={handleOnOverlayClick}
          changePopup={changePopup}
        />
      </div>
    </>
  );
}

export default App;
