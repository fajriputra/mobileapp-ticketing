import {GET_MOVIE, GET_MOVIEBYID, GET_MOVIE_FILTER} from '../constans';
import axios from '../../../helpers/axios';

export const getMovie = (page, limit, keyword, month, sortBy, sortType) => {
  return {
    type: GET_MOVIE,
    payload: axios.get(
      `/movies?page=${page}&limit=${limit}&month=${month}&keyword=${keyword}&sortBy=${sortBy}&sortType=${sortType}`,
    ),
  };
};

export const getMovieFilter = (
  page,
  limit,
  keyword,
  month,
  sortBy,
  sortType,
) => {
  return {
    type: GET_MOVIE_FILTER,
    payload: axios.get(
      `/movies?page=${page}&limit=${limit}&month=${month}&keyword=${keyword}&sortBy=${sortBy}&sortType=${sortType}`,
    ),
  };
};

export const getMovieById = id => {
  return {
    type: GET_MOVIEBYID,
    payload: axios.get(`/movies/${id}`),
  };
};
