import { TodoActionTypes } from '../actions/todoActionTypes';

const initialState = {
  items: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case TodoActionTypes.ADD: {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case TodoActionTypes.SET: {
      return {
        ...state,
        items: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default todoReducer;
