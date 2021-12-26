import {GET_LOCATION} from '../constans';

const initialState = {
  isLoading: false,
  isError: false,
  message: '',
  data: [],
};

const location = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_LOCATION}_PENDING`:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: '',
      };
    case `${GET_LOCATION}_FULFILLED`: {
      return {
        ...state,
        isLoading: false,
        message: 'Success get location',
        data: action.payload.data.provinsi,
      };
    }
    case `${GET_LOCATION}_REJECTED`: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: 'Fail to load location',
        data: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default location;
