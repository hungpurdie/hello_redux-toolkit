import { ActionTypes } from './counterActionTypes';

export const increment = (count) => {
  return {
    type: ActionTypes.INCREMENT,
    payload: count,
  };
};

export const decrement = (count) => {
  return {
    type: ActionTypes.DECREMENT,
    payload: count,
  };
};
