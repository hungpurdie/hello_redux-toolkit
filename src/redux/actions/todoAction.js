import axios from 'axios';
import { TodoActionTypes } from './types/todoActionTypes';

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
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/todos'
  );
  dispatch(setTodos(data));
};
