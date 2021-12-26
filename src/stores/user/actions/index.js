import axios from '../../../helpers/axios';
import {GET_DATA_USER} from '../constans';

export const getDataUser = () => {
  return {
    type: GET_DATA_USER,
    payload: axios.get('/user'),
  };
};
