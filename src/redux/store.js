import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import counterReducer from './reducers/counterReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  counterReducer,
  userReducer,
});

const middlewares = [thunk];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
