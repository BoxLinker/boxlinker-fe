import { createStore, applyMiddleware, combineReducers } from 'redux'
import {
  routerReducer,
  routerMiddleware,
  push
} from 'react-router-redux'

const store = createStore(
  combineReducers({ routerReducer, authReducer }),
  applyMiddleware(routerMiddleware(history)),
)

