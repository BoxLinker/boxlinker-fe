import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import registerServiceWorker from './registerServiceWorker';
import {
  Dashboard,
  Services,
  ServiceDetail,
  ServiceCreate,
  Volumes,
  Images,
  Login,
  Reg,
  User,
  CICD,
  CICDBuilding,
} from './containers';
import { auth } from './middleware';

import store from './store';

const history = syncHistoryWithStore(browserHistory, store);

function requireAuth(nextState, replace) {
  if (!auth()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Dashboard} onEnter={requireAuth} />
      <Route path="/login" component={Login} />
      <Route path="/reg" component={Reg} />
      <Route path="/user" component={User} />
      <Route path="/services" component={Services} onEnter={requireAuth} />
      <Route
        path="/services/create"
        component={ServiceCreate}
        onEnter={requireAuth}
      />
      <Route
        path="/services/:name"
        component={ServiceDetail}
        onEnter={requireAuth}
      />
      <Route path="/volumes" component={Volumes} onEnter={requireAuth} />
      <Route path="/images" component={Images} onEnter={requireAuth} />
      <Route path="/cicd" component={CICD} onEnter={requireAuth} />
      <Route
        path="/cicd/:scm/:name"
        component={CICDBuilding}
        onEnter={requireAuth}
      />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
