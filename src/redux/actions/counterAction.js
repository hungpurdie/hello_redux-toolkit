import { CounterActionTypes } from './types/counterActionTypes';

export const increment = (count) => ({
  type: CounterActionTypes.INCREMENT,
  payload: count,
});

export const decrement = (count) => ({
  type: CounterActionTypes.DECREMENT,
  payload: count,
});
