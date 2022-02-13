import { CounterActionTypes } from "redux/actions/types/counter";

const initialState = {
  count: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case CounterActionTypes.INCREMENT: {
      return {
        ...state,
        count: state.count + action.payload,
      };
    }

    case CounterActionTypes.DECREMENT: {
      return {
        ...state,
        count: state.count - action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default counterReducer;
