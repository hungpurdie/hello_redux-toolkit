import { AuthActionTypes } from "../actions/types/authActionTypes";

const initialState = {
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        token: action.payload,
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        token: null,
      };

    default: {
      return state;
    }
  }
};

export default authReducer;
