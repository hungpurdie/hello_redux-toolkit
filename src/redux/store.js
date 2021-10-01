import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import counterReducer from './reducers/counterReducer';

const rootReducer = combineReducers({ counter: counterReducer });

const middlewares = [thunk];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
