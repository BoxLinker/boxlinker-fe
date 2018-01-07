import cookies from 'js-cookie';
import { getUrlParameter } from '../utils';

const auth = () => {
  let token = cookies.get('X-Access-Token');
  if (!token) {
    token = getUrlParameter('token');
  }

  return !!token;
};
export default auth;
