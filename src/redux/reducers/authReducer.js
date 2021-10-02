import { AuthActionTypes } from '../actions/authActionTypes';

const initialState = {
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        token: action.payload,
      };

    default: {
      return state;
    }
  }
};

export default authReducer;
