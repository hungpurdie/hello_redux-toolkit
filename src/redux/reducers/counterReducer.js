import { CounterActionTypes } from '../actions/counterActionTypes';

const initialState = {
  countNumber: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case CounterActionTypes.INCREMENT: {
      return {
        ...state,
        countNumber: state.countNumber + 1,
      };
    }

    case CounterActionTypes.DECREMENT: {
      return {
        ...state,
        countNumber: state.countNumber - 1,
      };
    }
    default: {
      return state;
    }
  }
};

export default counterReducer;
