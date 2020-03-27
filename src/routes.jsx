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
import CreatePage from './pages/create';
import { isToken } from './libs/token';


const App = () => (
  <Switch>
    {!isToken() ? (
      <Route component={LoginPage} />
    ) : null}
    <Route
      exact
      path="/admin"
      render={value => <IndexPage {...value} />}
    />
    <Route
      exact
      path="/client/:id"
      render={value => <ClientPage {...value} />}
    />
    <Route
      exact
      path="/create"
      render={value => <CreatePage {...value} />}
    />
    <Redirect to="/admin" />
  </Switch>
);

export default hot(withRouter(App));
