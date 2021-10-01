import { ActionTypes } from '../actions/counterActionTypes';

const initialState = {
  countNumber: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.INCREMENT: {
      return {
        ...state,
        countNumber: state.countNumber + 1,
      };
    }

    case ActionTypes.DECREMENT: {
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
