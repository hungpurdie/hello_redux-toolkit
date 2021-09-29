import { combineReducers } from 'redux';
import counterReducer from './counter/counterReducer';
import { createStore } from 'redux';

const rootReducer = combineReducers({ counter: counterReducer });

const store = createStore(rootReducer);

export default store;
