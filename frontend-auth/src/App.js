import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import HomePage from './routes/HomePage';
import LoginPage from './routes/LoginPage';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(params) => (
    <AuthContext>
      {({ user }) => user
        ? <Component {...params} />
        : <Redirect to="/login" />}
    </AuthContext>
  )}
  />
)

export default () => (
  <Switch>
    <ProtectedRoute path="/" exact component={HomePage} />
    <Route path="/login" component={LoginPage} />
  </Switch>
);
