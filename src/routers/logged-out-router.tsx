import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NotFound } from '../pages/404';
import { CreateAccount } from '../pages/create-account';
import { Login } from '../pages/login';

interface IForm {
  email: string;
  password: string;
}

export const LoggedOutRouter: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
