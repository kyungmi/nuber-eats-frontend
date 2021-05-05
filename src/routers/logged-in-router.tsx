import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { authTokenVar, isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';
import { Restaurants } from '../pages/client/restaurants';
import { MeQuery } from '../__generated__/MeQuery';
import { NotFound } from '../pages/404';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';
import { ConfirmEmail } from '../pages/user/confirm-email';
import { EditProfile } from '../pages/user/edit-profile';

const ClientRoutes = [
  <Route path="/" exact key="restaurants-route">
    <Restaurants />
  </Route>,
  <Route path="/confirm" exact key="confirm-email-route">
    <ConfirmEmail />
  </Route>,
  <Route path="/edit-profile" exact key="edit-profile-route">
    <EditProfile />
  </Route>,
];

export const LoggedInRouter: FC = () => {
  const { data, loading, error } = useMe();

  if (loading || error || !data) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  const onLogout = () => {
    isLoggedInVar(false);
    authTokenVar(null);
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
  };

  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === 'Client' && ClientRoutes}
        <Route>
          <NotFound />
        </Route>
      </Switch>

      <button onClick={onLogout}>Log Out</button>
    </Router>
  );
};
