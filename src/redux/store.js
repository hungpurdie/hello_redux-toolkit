import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import counterReducer from "./reducers/counterReducer";
import userReducer from "./reducers/userReducer";
import todoReducer from "./reducers/todoReducer";
import authReducer from "./reducers/authReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { logout, refreshToken } from "./actions/authAction";

const rootReducer = combineReducers({
  counterReducer,
  userReducer,
  todoReducer,
  authReducer,
});

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["authReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const myMiddleware = (store) => (next) => (action) => {
  if (action.type === "todo/add" && action.payload === "fuck") {
    action.payload = "****";
  }
  return next(action);
};

const middlewares = [thunk, myMiddleware];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const interceptor = (store) => {
  axios.interceptors.request.use(
    async (config) => {
      const user = store?.getState()?.authReducer?.token;

      if (!config.headers["Authorization"] && user) {
        config.headers["x-access-token"] = `${user.accessToken}`;
      }

      if (user?.accessToken && user?.refreshToken) {
        const { exp: decodedAT } = jwt_decode(user.accessToken);
        const { exp: decodedRT } = jwt_decode(user.refreshToken);

        var currentTime = new Date().getTime() / 1000;
        let isExpiredAT = currentTime > decodedAT;
        let isExpiredRT = currentTime < decodedRT;
        console.log("Before: ", isExpiredAT, isExpiredRT);

        if (isExpiredAT && !isExpiredRT) {
          console.log("Refresh token success");
          await store.dispatch(refreshToken(user?.refreshToken));
          console.log("Refresh token success 2");
          if (config?.headers) {
            config.headers["authorization"] = store?.getState()?.authReducer?.token?.accessToken;
          }
        } else if (isExpiredAT && !isExpiredRT) {
          store.dispatch(logout());
        }
        console.log("After: ", isExpiredAT, isExpiredRT);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (next) => {
      return Promise.resolve(next);
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(...middlewares)));
interceptor(store);

export const persistor = persistStore(store);

export default store;
