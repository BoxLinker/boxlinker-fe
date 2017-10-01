import { combineReducers } from 'redux';
import { handleAction } from 'redux-actions';

const runtime = handleAction(
  'SET_RUNTIME_VARIABLE',
  (state, action) => ({
    ...state,
    [action.payload.name]: action.payload.value,
  }),
  {},
);

export default combineReducers({
  runtime,
});
