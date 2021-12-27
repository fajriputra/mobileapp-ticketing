import {USER_LOGIN} from '../constans';

const initialState = {
  isError: false,
  isLoading: false,
  data: {},
  message: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case `${USER_LOGIN}_PENDING`:
      return {
        ...state,
        data: {},
        isError: false,
        isLoading: true,
      };

    case `${USER_LOGIN}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data.data,
        isError: false,
        isLoading: false,
        message: action.payload.data.data.message,
      };

    case `${USER_LOGIN}_PENDING`:
      return {
        ...state,
        data: {},
        isError: true,
        isLoading: false,
        message: '',
      };

    default: {
      return state;
    }
  }
};

export default auth;
