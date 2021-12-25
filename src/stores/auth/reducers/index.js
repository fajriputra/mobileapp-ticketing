import {USER_LOGIN} from '../constans';

const initialState = {
  isError: false,
  isLoading: false,
  user: {},
  message: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case `${USER_LOGIN}_PENDING`:
      return {
        ...state,
        user: {},
        isError: false,
        isLoading: true,
      };

    case `${USER_LOGIN}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data.data,
        isError: false,
        isLoading: false,
        message: action.payload.data.data.message,
      };

    case `${USER_LOGIN}_PENDING`:
      return {
        ...state,
        user: {},
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
