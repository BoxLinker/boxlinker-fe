import { combineReducers } from 'redux';
import runtime from './runtime';
import userInfo from './user';

export default combineReducers({
  runtime,
  userInfo,
});
