import {createStore, applyMiddleware, combineReducers} from 'redux';
import {logger} from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';
import promiseMiddleware from 'redux-promise-middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducers from './auth/reducers';
import userReducers from './user/reducers';
import locationReducers from './location/reducers';
import moviesReducers from './movies/reducers';
import schedulesReducers from './schedules/reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducers = combineReducers({
  auth: authReducers,
  user: userReducers,
  location: locationReducers,
  movies: moviesReducers,
  schedules: schedulesReducers,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(
  persistedReducer,
  applyMiddleware(promiseMiddleware, logger),
);

const persistor = persistStore(store);

export {store, persistor};
