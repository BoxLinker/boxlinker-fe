import { handleAction } from 'redux-actions';

export default handleAction(
  'GET_USERINFO',
  (state, action) => {
    console.log('>>>>', state, action);
    return {
      ...state,
      userinfo: action.payload,
    };
  },
  {
    userinfo: null,
  },
);
