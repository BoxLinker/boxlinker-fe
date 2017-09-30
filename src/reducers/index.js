import { combineReducers } from 'redux';
// import runtime from './runtime';
// import userInfo from './user';
// import { services } from './application';
//
// export default combineReducers({
//   runtime,
//   userInfo,
//   services,
// });

import { handleAction } from 'redux-actions';

// const reducers = handleActions(
//   {
//     APP: {
//       RUNTIME: {
//         SET(state, action) {
//           return {
//             runtime: { ...state, [action.payload.name]: action.payload.value },
//           };
//         },
//       },
//     },
//   },
//   {
//     app: {
//       runtime: {},
//     },
//   },
// );

const runtime = handleAction(
  'APP/RUNTIME/SET',
  (state, action) => ({
    ...state,
    [action.payload.name]: action.payload.value,
  }),
  {},
);

export default combineReducers({
  runtime,
});
