import { AuthActionTypes } from "../actions/types/authActionTypes";

const initialState = {
  token: {
    accessToken: null,
    refreshToken: null,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        token: action.payload,
      };
    case AuthActionTypes.REFRESH_TOKEN_SUCCESS:
      console.log("action.payload: ", action.payload);
      return {
        ...state,
        token: {
          ...state.token,
          accessToken: action.payload,
        },
      };
    default: {
      return state;
    }
  }
};

export default authReducer;
