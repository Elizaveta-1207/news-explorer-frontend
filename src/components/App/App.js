import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import Header from '../Header/Header';
import AfterHeader from '../AfterHeader/AfterHeader';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';

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
              <AfterHeader />
            </div>
            <Main location={location} />
          </Route>
          <Route path='/saved-news'>
            <Header location={location} />
            <SavedNews location={location} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </>
  );
}

export default App;
