import { handleAction } from 'redux-actions';

export const images = handleAction(
  'GET_IMAGES',
  (state, action) => action.payload || {},
  {},
);

export default {
  images,
};
