import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from 'react-router-redux'

export default combineReducers({ routerReducer, authReducer });