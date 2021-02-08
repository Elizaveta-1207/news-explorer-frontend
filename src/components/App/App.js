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
  const [registerError, setRegisterError] = React.useState(false);

  //   const [userName, setUserName] = React.useState('');

  const [isPrelodaerOpen, setIsPrelodaerOpen] = React.useState(false);

  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});

  const [articles, setArticles] = React.useState([]);
  const [firstOpen, setFirstOpen] = React.useState(true);
  const [newsRow, setNewsRow] = React.useState(0);
  const [savedArticles, setSavedArticles] = React.useState([]);
  //   const [keywords, setKeywords] = React.useState([]);
  const [keyword, setKeyword] = React.useState('');

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

        localStorage.setItem('keyword', JSON.stringify(keyword));
        setKeyword(keyword);

        // !keywords.some((i) => i === keyword) && setKeywords([...keywords, keyword]);
        setNewsRow(0);
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  //   console.log(keyword);

  function resetRegisterError() {
    setRegisterError(false);
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
    setRegisterError(false);
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
        // setDataInfoTool({
        //   title: 'Что-то пошло не так! Попробуйте ещё раз.',
        // });
        setRegisterError(true);
        // openPopupInfo();
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
        console.error(err);
        setDataInfoTool({
          title: 'Неверный логин или пароль',
        });
        setIsPopupLoginOpen(false);
        openPopupInfo();
      });
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    // console.log(token);
    // if (token) {
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
      .catch((err) => {
        location.pathname === '/saved-news' && handleOnAuthClick() && history.push('/');
        console.log(err);
      });
    // }
  }

  function saveArticle(article) {
    const token = localStorage.getItem('token');
    // const articleReq = {
    //   // keyword: article.keyword,
    //   name: article.name,
    //   title: article.title,
    //   description: article.description,
    //   url: article.url,
    //   urlToImage: article.urlToImage,
    //   publishedAt: article.publishedAt,
    // };
    const saved = savedArticles.find(
      (item) => item.title === article.title && item.link === article.link,
    );

    if (!saved) {
      createArticle(article, token)
        .then((savedArticle) => {
          setSavedArticles([savedArticle, ...savedArticles]);

          //   !keywords.some((i) => i === article.keyword) &&
          //     setKeywords([article.keyword, ...keywords]);
          //   console.log(tempKey);
          //   localStorage.setItem('keywords', JSON.stringify(tempKey));
        })
        .catch((err) => console.log(err));
    } else {
      deleteArticle(saved._id, token)
        .then(() => {
          let savedArr = savedArticles.filter((articles) => articles._id !== saved._id);
          setSavedArticles(savedArr);

          //   console.log(savedArr);
          //   console.log(saved);
          //   console.log(keywords);
          //   console.log(!savedArr.some((i) => i.keyword === saved.keyword));

          //   let tempKey = keywords;
          //   if (!savedArr.some((i) => i.keyword === saved.keyword)) {
          //     tempKey = keywords.filter((i) => i !== saved.keyword);
          //     setKeywords(tempKey);
          //   }
          //   localStorage.setItem('keywords', JSON.stringify(tempKey));
          //   console.log(tempKey);
        })
        .catch((err) => console.log(err));
    }
    // console.log(keywords);
  }
  //   console.log(keywords);
  //   console.log(savedArticles);

  // проверка токена при загрузке страницы
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

  // запись сохраненных новостей
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    loggedIn && getArticles(token).then((res) => res && setSavedArticles(res));
  }, [loggedIn]);

  //   console.log(savedArticles);

  // показ последних найденных новостей
  React.useEffect(() => {
    // localStorage.getItem('news');
    // localStorage.setItem('news', JSON.stringify(articles));
    if (JSON.parse(localStorage.getItem('news'))) {
      setArticles(JSON.parse(localStorage.getItem('news')));
      setKeyword(JSON.parse(localStorage.getItem('keyword')));

      // localStorage.setItem('keywords', JSON.stringify(keywords));

      //   setKeywords(JSON.parse(localStorage.getItem('keywords')));
    } else {
      localStorage.removeItem('news');
      localStorage.removeItem('keyword');
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

  function onOverlayBurger() {
    setIsBurgerOpen(false);
  }

  return (
    // <CurrentUserContext.Provider value={currentUser}>
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
            // временно
            // articles={articles}
            savedArticles={savedArticles}
            saveArticle={saveArticle}
            // keyword={keyword}
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
