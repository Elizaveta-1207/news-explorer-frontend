import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';

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

import getNews from '../../utils/NewsApi';

function App() {
  const location = useLocation();
  // загатовка для авторизации пользователя
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [isPopupLoginOpen, setIsPopupLoginOpen] = React.useState(false);
  const [isPopupRegisterOpen, setIsPopupRegisterOpen] = React.useState(false);
  const [isPopupInfoOpen, setIsPopupInfoOpen] = React.useState(false);

  const [isPrelodaerOpen, setIsPrelodaerOpen] = React.useState(false);

  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);
  const [firstOpen, setFirstOpen] = React.useState(true);
  const [newsRow, setNewsRow] = React.useState(0);

  // временная функция для прелоадера
  //   function handleSearch() {
  //     setIsPrelodaerOpen(true);
  //     setTimeout(() => setIsPrelodaerOpen(false), 1000);
  //   }

  function handleSearch(keyword) {
    setIsPrelodaerOpen(true);
    getNews(keyword)
      .then((results) => {
        setFirstOpen(false);
        setIsPrelodaerOpen(false);
        setCards(results.articles);

        setNewsRow(0);
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  function handleShowMore() {
    setNewsRow(newsRow + 1);
  }

  function handleOnAuthClick() {
    setIsPopupLoginOpen(true);
  }

  function openBurger() {
    setIsBurgerOpen(!isBurgerOpen);
  }

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

  function handleLogin() {
    setLoggedIn(true);
    closeAllPopups();
  }

  function signOut() {
    setLoggedIn(false);
  }

  //   React.useEffect(() => {
  //     getNews('президент')
  //       .then((results) => {
  //         setCards(results.articles);
  //       })
  //       .catch((err) => console.log(`Error ${err}`));
  //   }, []);

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

  React.useEffect(() => {
    window.addEventListener('resize', (evt) => {
      setScreenWidth(evt.target.innerWidth);
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className={`${isBurgerOpen && 'page__shadow'} `}></div>
        <Switch>
          <Route exact path='/'>
            <div className='page__container'>
              <Header
                location={location}
                loggedIn={loggedIn}
                onAuth={handleOnAuthClick}
                signOut={signOut}
                isBurgerOpen={isBurgerOpen}
                openBurger={openBurger}
              />
              <AfterHeader handleSearch={handleSearch} />
            </div>
            <Main
              location={location}
              isPrelodaerOpen={isPrelodaerOpen}
              loggedIn={loggedIn}
              screenWidth={screenWidth}
              cards={cards}
              firstOpen={firstOpen}
              handleShowMore={handleShowMore}
              newsRow={newsRow}
            />
          </Route>
          <ProtectedRoute
            path='/saved-news'
            component={SavedNewsPage}
            location={location}
            loggedIn={loggedIn}
            signOut={signOut}
            isBurgerOpen={isBurgerOpen}
            openBurger={openBurger}
            screenWidth={screenWidth}
            // временно
            cards={cards}
          />
        </Switch>
        <Footer screenWidth={screenWidth} />

        <PopupLogin
          isOpen={isPopupLoginOpen}
          onClose={closeAllPopups}
          onOverlay={handleOnOverlayClick}
          changePopup={changePopup}
          handleLogin={handleLogin}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
