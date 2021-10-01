import { INCREMENT, DECREMENT } from './counterActionTypes';

export const increment = (count) => {
  return {
    type: INCREMENT,
    payload: count,
  };
};

export const decrement = (count) => {
  return {
    type: DECREMENT,
    payload: count,
  };
};
