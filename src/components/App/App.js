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

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [isPopupLoginOpen, setIsPopupLoginOpen] = React.useState(false);
  const [isPopupRegisterOpen, setIsPopupRegisterOpen] = React.useState(false);
  const [isPopupInfoOpen, setIsPopupInfoOpen] = React.useState(false);
  const [dataInfoTool, setDataInfoTool] = React.useState({
    title: '',
  });
  const [registerError, setRegisterError] = React.useState(false);

  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);

  const [isPrelodaerOpen, setIsPrelodaerOpen] = React.useState(false);
  const [articles, setArticles] = React.useState([]);
  const [firstOpen, setFirstOpen] = React.useState(true);
  const [newsRow, setNewsRow] = React.useState(0);

  const [savedArticles, setSavedArticles] = React.useState([]);
  const [keyword, setKeyword] = React.useState('');

  const history = useHistory();

  // поиск статей
  function handleSearch(keyword) {
    setIsPrelodaerOpen(true);
    getNews(keyword)
      .then((results) => {
        localStorage.setItem('news', JSON.stringify(results.articles));
        setFirstOpen(false);
        setIsPrelodaerOpen(false);
        setArticles(results.articles);

        localStorage.setItem('keyword', JSON.stringify(keyword));
        setKeyword(keyword);
        setNewsRow(0);
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  // сброс ошибки при регистрации о том, что пользователь существует
  function resetRegisterError() {
    setRegisterError(false);
  }

  // показать следующую строку со статьями
  function handleShowMore() {
    setNewsRow(newsRow + 1);
  }

  // открытие попапа авторизации
  function handleOnAuthClick() {
    setIsPopupLoginOpen(true);
  }

  // открытие бургер-меню
  function openBurger() {
    setIsBurgerOpen(!isBurgerOpen);
  }

  // при открытии попапа с инфо закрывать попап с регистрацией и авторизацией
  function openPopupInfo() {
    setIsPopupInfoOpen(true);
    setIsPopupRegisterOpen(false);
    setIsPopupLoginOpen(false);
  }

  // закрытие всех попапов
  function closeAllPopups() {
    setIsPopupLoginOpen(false);
    setIsPopupRegisterOpen(false);
    setIsPopupInfoOpen(false);
    setRegisterError(false);
  }

  // закрытие попапов по оверлею
  function handleOnOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  // переключение между попапами
  function changePopup(evt) {
    closeAllPopups();
    evt.target.textContent === 'Зарегистрироваться'
      ? setIsPopupRegisterOpen(true)
      : setIsPopupLoginOpen(true);
  }

  // выход из своей учетной записи
  function signOut() {
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem('token');
    history.push('/');
  }

  // регистрация
  function handleRegister(email, password, name) {
    register(email, password, name)
      .then((data) => {
        setDataInfoTool({
          title: 'Пользователь успешно зарегистрирован!',
        });
        openPopupInfo();
      })
      .catch((err) => {
        console.error(err);
        setRegisterError(true);
      });
  }

  // авторизация
  function handleLogin(email, password) {
    authorize(email, password)
      .then((data) => {
        localStorage.setItem('token', data.token);
        getUserMe(data.token).then((res) => {
          setCurrentUser(res);
        });
        setLoggedIn(true);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
        setDataInfoTool({
          title: 'Неверный логин или пароль',
        });
        openPopupInfo();
      });
  }

  // проверка токена
  function tokenCheck() {
    const token = localStorage.getItem('token');
    getUserMe(token)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser(res);
          location.pathname === '/saved-news' ? history.push('/saved-news') : history.push('/');
        } else {
          setDataInfoTool({
            title: 'Что-то пошло не так! Попробуйте ещё раз.',
          });
          openPopupInfo();
        }
      })
      .catch((err) => {
        location.pathname === '/saved-news' && handleOnAuthClick() && history.push('/');
        console.log(err);
      });
  }

  // сохранение статьи
  function saveArticle(article) {
    const token = localStorage.getItem('token');
    const saved = savedArticles.find(
      (item) => item.title === article.title && item.link === article.link,
    );

    if (!saved) {
      createArticle(article, token)
        .then((savedArticle) => {
          setSavedArticles([savedArticle, ...savedArticles]);
        })
        .catch((err) => console.log(err));
    } else {
      deleteArticle(saved._id, token)
        .then(() => {
          let savedArr = savedArticles.filter((articles) => articles._id !== saved._id);
          setSavedArticles(savedArr);
        })
        .catch((err) => console.log(err));
    }
  }

  // проверка токена при загрузке страницы
  React.useEffect(() => {
    tokenCheck();
  }, []);

  // запись сохраненных новостей
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    loggedIn && getArticles(token).then((res) => res && setSavedArticles(res.reverse()));
  }, [loggedIn]);

  // показ последних найденных новостей
  React.useEffect(() => {
    if (JSON.parse(localStorage.getItem('news'))) {
      setArticles(JSON.parse(localStorage.getItem('news')));
      setKeyword(JSON.parse(localStorage.getItem('keyword')));
    } else {
      localStorage.removeItem('news');
      localStorage.removeItem('keyword');
    }
  }, []);

  // закрытие попапов с помощью Esc
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

  // отслеживание изменения ширины экрана
  React.useEffect(() => {
    window.addEventListener('resize', (evt) => {
      setScreenWidth(evt.target.innerWidth);
    });
  }, []);

  function onOverlayBurger() {
    setIsBurgerOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className={`${isBurgerOpen && 'page__shadow'} `} onClick={onOverlayBurger}></div>
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
              saveArticle={saveArticle}
              savedArticles={savedArticles}
              handleOnAuthClick={handleOnAuthClick}
              keyword={keyword}
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
            savedArticles={savedArticles}
            saveArticle={saveArticle}
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
          handleRegister={handleRegister}
          registerError={registerError}
          resetRegisterError={resetRegisterError}
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
