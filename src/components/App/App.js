import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import Header from '../Header/Header';
import AfterHeader from '../AfterHeader/AfterHeader';
import Main from '../Main/Main';
// import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedNewsPage from '../SavedNewsPage/SavedNewsPage';

import './App.css';

function App() {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <>
      <div className='page'>
        <Switch>
          <Route exact path='/'>
            <div className='page__container'>
              <Header location={location} loggedIn={loggedIn} />
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
          {/* <Header location={location} />
            <SavedNews location={location} />
          </ProtectedRoute> */}
        </Switch>
        <Footer />
      </div>
    </>
  );
}

export default App;
