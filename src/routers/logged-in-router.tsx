import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
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

const ClientRoutes = [
  <Route path="/" exact key="restaurants-route">
    <Restaurants />
  </Route>,
];

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter: FC = () => {
  const { data, loading, error } = useQuery<MeQuery>(ME_QUERY);

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
