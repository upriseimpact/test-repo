import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';

import NotFoundPage from '../pages/NotFoundPage';

var routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/" component={NotFoundPage} />
  </Switch>
);

export default routes;
