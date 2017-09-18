import { ACTION_USERINFO } from '../constants';

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
