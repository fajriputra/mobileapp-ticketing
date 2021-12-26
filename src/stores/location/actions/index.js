import axios from 'axios';
import {GET_LOCATION} from '../constans';

export const getLocation = () => {
  return {
    type: GET_LOCATION,
    payload: axios.get(
      'https://dev.farizdotid.com/api/daerahindonesia/provinsi',
    ),
  };
};
