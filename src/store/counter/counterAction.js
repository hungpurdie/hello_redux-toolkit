export const ActionTypes = {
  INCREMENT: 'count/increment',
  DECREMENT: 'count/decrement',
};

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
