import {GET_MOVIE, GET_MOVIEBYID, GET_MOVIE_FILTER} from '../constans';

const initialState = {
  isLoading: false,
  isError: false,
  message: '',
  data: [],
  dataFiltered: [],
  dataById: {},
  pageInfo: {},
};

const movies = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_MOVIE}_PENDING`: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: '',
      };
    }
    case `${GET_MOVIE}_FULFILLED`: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
        data: action.payload.data.data,
        pageInfo: action.payload.data.pagination,
      };
    }
    case `${GET_MOVIE}_REJECTED`: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message,
        data: [],
        pageInfo: {},
      };
    }
    case `${GET_MOVIEBYID}_PENDING`: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: '',
      };
    }
    case `${GET_MOVIEBYID}_FULFILLED`: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
        dataById: action.payload.data.data,
        pageInfo: action.payload.data.pagination,
      };
    }
    case `${GET_MOVIEBYID}_REJECTED`: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message,
        dataById: {},
        pageInfo: {},
      };
    }
    case `${GET_MOVIE_FILTER}_PENDING`: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: '',
      };
    }
    case `${GET_MOVIE_FILTER}_FULFILLED`: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
        dataFiltered: action.payload.data.data,
        pageInfo: action.payload.data.pagination,
      };
    }
    case `${GET_MOVIE_FILTER}_REJECTED`: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message,
        dataFiltered: [],
        pageInfo: {},
      };
    }

    default:
      return state;
  }
};

export default movies;
