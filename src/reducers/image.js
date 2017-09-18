import { ACTION_RECEIVE_IMAGE } from '../constants';

export default function runtime(state = {}, action) {
  switch (action.type) {
    case ACTION_RECEIVE_IMAGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
}
