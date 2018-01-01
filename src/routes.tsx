import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './containers/Home';
import Service from './containers/Service';

export default (
  <Route path="/">
    <IndexRoute component={Home} />
    <Route path="/services">
      <IndexRoute component={Service} />
    </Route>
  </Route>
);