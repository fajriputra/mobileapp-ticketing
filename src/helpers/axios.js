import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {REACT_APP_HOST} from '@env';

console.log('HOST', REACT_APP_HOST);

const instance = axios.create({
  baseURL: REACT_APP_HOST,
});

const removeKey = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('id');
};

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const jwtExpired = error.response.data.message;
    if (error.response.data.status === 403 && jwtExpired) {
      removeKey();
    }
    return Promise.reject(error);
  },
);

export default instance;
