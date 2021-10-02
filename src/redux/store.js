import { combineReducers, createStore, applyMiddleware } from 'redux';

import counterReducer from './reducers/counterReducer';
import userReducer from './reducers/userReducer';
import todoReducer from './reducers/todoReducer';

const rootReducer = combineReducers({
  counterReducer,
  userReducer,
  todoReducer,
});
// import thunk from 'redux-thunk';
// const middlewares = [thunk];

const myMiddleware = (store) => (next) => (action) => {
  if (action.type === 'todo/add' && action.payload === 'fuck') {
    action.payload = '****';
  }

  return next(action);
};

const todoMiddleware = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    console.log(action);
    console.log(next);
    return action(next);
  }
  return next(action);
};

const userMiddleware = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    console.log(action);
    console.log(next);
    return action(next);
  }
  return next(action);
};

const store = createStore(
  rootReducer,
  applyMiddleware(myMiddleware, todoMiddleware, userMiddleware)
);

export default store;
