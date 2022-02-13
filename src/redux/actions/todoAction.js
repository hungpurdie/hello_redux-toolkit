import todoApi from "apis/todoApi";
import { TodoActionTypes } from "./types/todo";

export const addTodo = (text) => {
  return {
    type: TodoActionTypes.ADD,
    payload: text,
  };
};

export const setTodos = (items) => {
  return {
    type: TodoActionTypes.SET,
    payload: items,
  };
};

export const fetchTodos = () => async (dispatch) => {
  const data = await todoApi.fetchTodos();
  dispatch(setTodos(data));
};
