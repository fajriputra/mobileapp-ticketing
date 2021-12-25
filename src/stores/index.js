import {createStore, applyMiddleware, combineReducers} from 'redux';
import {logger} from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';
import promiseMiddleware from 'redux-promise-middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducers from './auth/reducers/index';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducers = combineReducers({
  auth: authReducers,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(
  persistedReducer,
  applyMiddleware(promiseMiddleware, logger),
);

const persistor = persistStore(store);

export {store, persistor};
