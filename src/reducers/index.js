import { handleAction } from 'redux-actions';

const userinfo = handleAction(
  'GET_USERINFO',
  (state, action) => {
    // 此处的 state 就是 userinfo，所以返回值就不能再包一层 userinfo 了
    return {
      ...state,
      ...action.payload,
    };
  },
  {},
);

const breadCrumb = handleAction(
  'BREADCRUMB',
  (state, action) => {
    return action.payload;
  },
  [],
);

export default {
  userinfo,
  breadCrumb,
};
