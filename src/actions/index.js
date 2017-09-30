// import { setRuntimeVariable } from './runtime';
// import { getUserInfo } from './user';
//
// export default {
//   setRuntimeVariable,
//   getUserInfo,
// };
/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';

// const actions = createActions({
//   APP: {
//     RUNTIME: {
//       SET: undefined,
//     },
//     // SERVICES: {
//     //   QUERY: undefined,
//     // },
//   },
// });

export const runtime = createAction('SET_RUNTIME_VARIABLE', (name, value) => ({
  [name]: value,
}));
