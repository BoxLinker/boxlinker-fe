import { combineReducers } from 'redux';
import { handleAction } from 'redux-actions';
import { images } from './image';

const runtime = handleAction(
  'SET_RUNTIME_VARIABLE',
  (state, action) => ({
    ...state,
    [action.payload.name]: action.payload.value,
  }),
  {},
);

const userinfo = handleAction(
  'GET_USERINFO',
  (state, action) => ({
    ...state,
    ...action.payload,
  }),
  {},
);

const services = handleAction(
  'GET_SERVICES',
  (state, action) => action.payload || {},
  {},
);

export default combineReducers({
  runtime,
  userinfo,
  services,
  images,
});
