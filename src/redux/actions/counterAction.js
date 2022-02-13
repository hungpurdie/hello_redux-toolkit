import { CounterActionTypes } from "./types/counter";

export const increment = (count) => ({
  type: CounterActionTypes.INCREMENT,
  payload: count ? count : 1,
});

export const decrement = (count) => ({
  type: CounterActionTypes.DECREMENT,
  payload: count ? count : 1,
});
