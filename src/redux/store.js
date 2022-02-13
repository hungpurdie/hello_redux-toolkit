import { applyMiddleware, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";
import { interceptor } from "apis/axiosClient";

const myMiddleware = () => (next) => (action) => {
  if (action.type === "todo/add" && action.payload === "fuck") {
    action.payload = "****";
  }
  return next(action);
};

//Configure store redux persist
const persistConfig = {
  key: "auth",
  storage,
  blacklist: ["users"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk, myMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);

const store = createStore(persistedReducer, composedEnhancers);
interceptor(store);
// if (process.env.NODE_ENV !== "production" && module.hot) {
//   module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
// }

export const persistor = persistStore(store);

export default store;
