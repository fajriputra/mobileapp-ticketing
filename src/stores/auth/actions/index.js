import axios from '../../../helpers/axios';
import {USER_LOGIN} from '../constans';

export const userLogin = data => {
  return {
    type: USER_LOGIN,
    payload: axios.post('/auth/login', data),
  };
};
