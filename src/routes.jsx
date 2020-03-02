import React from 'react';
import {
  withRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import LoginPage from './pages/login';
import IndexPage from './pages/index';
import ClientPage from './pages/client';
import { isToken } from './libs/token';


const App = () => (
  <Switch>
    {!isToken() ? (
      <Route component={LoginPage} />
    ) : null}
    <Route
      exact
      path="/"
      render={value =><IndexPage {...value} />}
    />
    <Route
      exact
      path="/client/:id"
      // render={value => <CurrenciesContextProvider><ExchangesPage {...value} /></CurrenciesContextProvider>}
      render={value =><ClientPage {...value} />}
    />
    <Redirect to="/" />
  </Switch>
);

export default hot(withRouter(App));
