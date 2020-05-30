import React from 'react';
import {
  withRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { isToken } from './libs/token';


import LoginPage from './pages/login';
import IndexPage from './pages/index';
import RegisterPage from './pages/register';
import MemberPage from './pages/member';
import MembersPage from './pages/members';
import OtherMemberPage from './pages/other-member';

const App = () => (
  <Switch>
    {!isToken() ? (
    <>
      <Route
        exact
        path="/"
        render={IndexPage}
      />
      <Route
        exact
        path="/login"
        component={LoginPage}
      />
      <Route
        exact
        path="/register"
        render={RegisterPage}
      />
    </>
    ) : null}
    <Route
      exact
      path="/"
      render={IndexPage}
    />
    <Route
      exact
      path="/member/:id"
      render={value => <MemberPage {...value} />}
    />
    <Route
      exact
      path="/otherMember/:id"
      render={value => <OtherMemberPage {...value} />}
    />    
    <Route
      exact
      path="/members"
      render={value => <MembersPage {...value} />}
    />
    <Redirect to="/" />
  </Switch>
);

export default hot(withRouter(App));
