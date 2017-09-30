/* eslint-disable import/prefer-default-export */

// import { SET_RUNTIME_VARIABLE } from '../constants';
//
// export function setRuntimeVariable({ name, value }) {
//   return {
//     type: SET_RUNTIME_VARIABLE,
//     payload: {
//       name,
//       value,
//     },
//   };
// }

import { createAction } from 'redux-actions';

const setRunTimeVariable = createAction('SET_RUNTIME_VARIABLE');

export default setRunTimeVariable;
