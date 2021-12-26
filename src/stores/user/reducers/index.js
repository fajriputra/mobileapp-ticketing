import {GET_DATA_USER} from '../constans';

const initialState = {
  isLoading: false,
  data: {},
  isError: false,
  message: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_DATA_USER}_PENDING`: {
      return {
        ...state,
        data: {},
        isLoading: true,
        isError: false,
      };
    }
    case `${GET_DATA_USER}_FULFILLED`: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data[0],
        message: action.payload.data.message,
      };
    }
    case `${GET_DATA_USER}_REJECTED`: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        message: action.payload.response.data.message,
      };
    }
    default: {
      return state;
    }
  }
};

export default user;
