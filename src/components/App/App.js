import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
// import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';

import './App.css';

function App() {
  const location = useLocation();

  return (
    <>
      <div className='page'>
        <Switch>
          <Route exact path='/'>
            <div className='page__container'>
              <Header location={location} />
              <Main />
            </div>
            <Preloader />
            <NewsCardList location={location} />
            <About />
          </Route>
          <Route path='/saved-news'>
            <Header location={location} />
            <SavedNews />
          </Route>
        </Switch>
        <Footer />
      </div>
    </>
  );
}

export default App;
