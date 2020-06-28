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
import RegisterShortPage from './pages/register-light';
import MemberPage from './pages/member';
import MembersPage from './pages/members';
import OtherMemberPage from './pages/other-member';
import UstavPage from './pages/UstavPage';

import VerifyUser from './pages/VerifyUser';
import ActivateUser from './pages/ActivateUser';

const App = () => (
  <Switch>
    {!isToken() ? (
    <>
      <Route
        exact
        path="/"
        component={IndexPage}
      />
      <Route
        exact
        path="/login"
        component={LoginPage}
      />
      <Route
        exact
        path="/register"
        component={RegisterShortPage}
      />
      <Route
        exact
        path="/ustav"
        component={UstavPage}
      />
      <Route
        exact
        path="/createNewUser"
        component={ActivateUser}
      />
      <Route
        exact
        path="/authQRCode"
        component={VerifyUser}
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
    <Route
      exact
      path="/ustav"
      component={UstavPage}
    />
    <Redirect to="/" />
  </Switch>
);

export default hot(withRouter(App));
