import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import counterReducer from "./reducers/counterReducer";
import userReducer from "./reducers/userReducer";
import todoReducer from "./reducers/todoReducer";
import authReducer from "./reducers/authReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  counterReducer,
  userReducer,
  todoReducer,
  authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authReducer", "token"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const myMiddleware = (store) => (next) => (action) => {
  if (action.type === "todo/add" && action.payload === "fuck") {
    action.payload = "****";
  }
  return next(action);
};

// const todoMiddleware = (store) => (next) => (action) => {
//   if (typeof action === 'function') {
//     console.log(action);
//     console.log(next);
//     return action(next);
//   }
//   return next(action);
// };

// const userMiddleware = (store) => (next) => (action) => {
//   if (typeof action === 'function') {
//     console.log(action);
//     console.log(next);
//     return action(next);
//   }
//   return next(action);
// };

const middlewares = [thunk, myMiddleware];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(...middlewares)));

export const persistor = persistStore(store);

export default store;
