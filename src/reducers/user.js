import { ACTION_USERINFO } from 'const';

export default function userInfo(state = {}, action) {
  switch (action.type) {
    case ACTION_USERINFO:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
