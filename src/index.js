import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import registerServiceWorker from './registerServiceWorker';
import { Dashboard, Services, Volumes, Images } from './containers';

import store from './store';

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Dashboard} />
      <Route path="/services" component={Services} />
      <Route path="/volumes" component={Volumes} />
      <Route path="/images" component={Images} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
