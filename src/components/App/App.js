import React from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';

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
import {
  register,
  authorize,
  getUserMe,
  getArticles,
  createArticle,
  deleteArticle,
} from '../../utils/MainApi';

function App() {
  const location = useLocation();
  // загатовка для авторизации пользователя
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [isPopupLoginOpen, setIsPopupLoginOpen] = React.useState(false);
  const [isPopupRegisterOpen, setIsPopupRegisterOpen] = React.useState(false);
  const [isPopupInfoOpen, setIsPopupInfoOpen] = React.useState(false);
  const [dataInfoTool, setDataInfoTool] = React.useState({
    title: '',
  });

  //   const [userName, setUserName] = React.useState('');

  const [isPrelodaerOpen, setIsPrelodaerOpen] = React.useState(false);

  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});

  const [articles, setArticles] = React.useState([]);
  const [firstOpen, setFirstOpen] = React.useState(true);
  const [newsRow, setNewsRow] = React.useState(0);

  const history = useHistory();
  // временная функция для прелоадера
  //   function handleSearch() {
  //     setIsPrelodaerOpen(true);
  //     setTimeout(() => setIsPrelodaerOpen(false), 1000);
  //   }

  function handleSearch(keyword) {
    setIsPrelodaerOpen(true);
    getNews(keyword)
      .then((results) => {
        localStorage.setItem('news', JSON.stringify(results.articles));
        setFirstOpen(false);
        setIsPrelodaerOpen(false);
        setArticles(results.articles);

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

  function signOut() {
    setLoggedIn(false);
    // setUserName('');
    setCurrentUser({});
    localStorage.removeItem('token');
    history.push('/');
  }

  function handleRegister(email, password, name) {
    register(email, password, name)
      .then((data) => {
        // history.push('/sign-in');
        // console.log(data);
        setDataInfoTool({
          title: 'Пользователь успешно зарегистрирован!',
        });
        openPopupInfo();
      })
      .catch((err) => {
        console.error(err);
        setDataInfoTool({
          title: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        openPopupInfo();
      });
  }

  function handleLogin(email, password) {
    // console.log(email, password);
    authorize(email, password)
      .then((data) => {
        // console.log(data);
        localStorage.setItem('token', data.token);
        // setUserName(email);
        getUserMe(data.token).then((res) => {
          //   setUserName(res.name);
          setCurrentUser(res);
        });
        setLoggedIn(true);
        closeAllPopups();
        // history.push('/');
      })
      .catch((err) => {
        setDataInfoTool({
          title: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        console.error(err);
        openPopupInfo();
      });
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      getUserMe(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            // console.log(res);
            // setUserName(res.name);
            setCurrentUser(res);
            location.pathname === '/saved-news' ? history.push('/saved-news') : history.push('/');
            // console.log(userName);
            // history.push("/");
          } else {
            setDataInfoTool({
              title: 'Что-то пошло не так! Попробуйте ещё раз.',
            });
            openPopupInfo();
          }
        })
        .catch((err) => console.log(err));
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  //   React.useEffect(() => {
  //     getNews('президент')
  //       .then((results) => {
  //         setArticles(results.articles);
  //       })
  //       .catch((err) => console.log(`Error ${err}`));
  //   }, []);

  // показ последних найденных новостей
  React.useEffect(() => {
    // localStorage.getItem('news');
    // localStorage.setItem('news', JSON.stringify(articles));
    if (JSON.parse(localStorage.getItem('news'))) {
      setArticles(JSON.parse(localStorage.getItem('news')));
    } else {
      localStorage.removeItem('news');
    }
    // console.log(articles);
  }, []);

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
    // <CurrentUserContext.Provider value={currentUser}>
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
              articles={articles}
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
            articles={articles}
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
          handleRegister={handleRegister}
        />

        <PopupInfo
          isOpen={isPopupInfoOpen}
          onClose={closeAllPopups}
          onOverlay={handleOnOverlayClick}
          changePopup={changePopup}
          title={dataInfoTool.title}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
