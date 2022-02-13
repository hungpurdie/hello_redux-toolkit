import { combineReducers } from "redux";
import counterReducer from "components/Counter/CounterSlice";
import userReducer from "components/UserList/UserListSlice";
import todoReducer from "components/TodoList/TodoSlice";
import authReducer from "components/Login/LoginSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  users: userReducer,
  todos: todoReducer,
  auth: authReducer
});

export default rootReducer;
