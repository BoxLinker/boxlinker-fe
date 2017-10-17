import { handleAction } from 'redux-actions';

export const volumes = handleAction(
  'GET_VOLUMES',
  (state, action) => action.payload || {},
  {},
);

export default {
  volumes,
};
