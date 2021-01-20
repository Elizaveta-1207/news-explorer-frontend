import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';

import './App.css';

function App() {
  return (
    <>
      <div className='page'>
        <Header />
        <Switch>
          <Route exact path='/'>
            <h1>App</h1>
            <Main />
          </Route>
          <Route path='/saved-news'>
            <h1>DO it</h1>
            <SavedNews />
          </Route>
        </Switch>
        <Footer />
      </div>
    </>
  );
}

export default App;
