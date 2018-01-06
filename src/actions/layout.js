
import { push as originPush } from 'react-router-redux';

const push = (path) => (dispatch) => {
  dispatch(originPush(path));
};

export default {
  push,
};