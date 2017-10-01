/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';

export const runtime = createAction('SET_RUNTIME_VARIABLE', (name, value) => ({
  name,
  value,
}));
