import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';

var routes = (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <Route path="/" component={NotFoundPage} />
  </Switch>
);

export default routes;
