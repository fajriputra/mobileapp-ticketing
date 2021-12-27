import {GET_SCHEDULE} from '../constans';
import axios from '../../../helpers/axios';

export const getSchedule = (page, limit, movieId, location, sortType) => {
  return {
    type: GET_SCHEDULE,
    payload: axios.get(
      `/schedule?page=${page}&limit=${limit}&movieId=${movieId}&location=${location}&sortType=${sortType}`,
    ),
  };
};
