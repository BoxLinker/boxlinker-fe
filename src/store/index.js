import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise';
import { createLogger as reduxLogger } from 'redux-logger';
import { browserHistory } from 'react-router';
import reducers from '../reducers';

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer,
  }),
  applyMiddleware(
    routerMiddleware(browserHistory),
    reduxLogger({
      collapsed: true,
    }),
    promiseMiddleware,
  ),
);

export default store;
