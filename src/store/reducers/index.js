import { combineReducers } from "redux";
import counterSlice from "../../features/Counter/counterSlice";
import loginSlice from "../../features/Login/loginSlice";
import registerSlice from "../../features/Register/registerSlice";
import todoSlice from "../../features/TodoList/todoSlice";
import userListSlice from "../../features/UserList/userListSlice";
import authSlice from "./authSlice";
import captchaSlice from "./captchaSlice";

export const rootReducer = combineReducers({
  counter: counterSlice,
  login: loginSlice,
  todo: todoSlice,
  users: userListSlice,
  captcha: captchaSlice,
  auth: authSlice,
  register: registerSlice,
});
