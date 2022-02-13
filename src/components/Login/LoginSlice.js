import { AuthActionTypes } from "redux/actions/types/auth";

const initialState = {
  login: {
    auth: {
      accessToken: null,
      refreshToken: null,
    },
    error: false,
    isFetching: false,
    success: false,
    message: null,
    countError: 0,
  },
  captcha: {
    isFetching: false,
    success: false,
    message: null,
  },
  logout: {
    error: false,
    isFetching: false,
    success: false,
    message: null,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_START:
      return {
        ...state,
        login: {
          isFetching: true,
          error: false,
          success: false,
          message: null,
          countError: 0,
        },
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          isFetching: false,
          success: true,
          auth: action.payload,
          message: null,
          countError: 0,
        },
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        login: {
          isFetching: false,
          success: false,
          auth: {
            accessToken: null,
            refreshToken: null,
          },
          message: action.payload,
          countError: state.login.countError + 1,
        },
      };

    case AuthActionTypes.LOGIN_GOOGLE_SUCCESS:
      return {
        ...state,
        login: {
          isFetching: false,
          success: true,
          auth: action.payload,
          message: null,
          countError: 0,
        },
      };

    case AuthActionTypes.LOGOUT_START:
      return {
        ...state,
        logout: {
          isFetching: true,
          error: false,
          success: false,
          message: null,
        },
      };
    case AuthActionTypes.LOGOUT_SUCCESS:
      return {
        logout: {
          ...state.logout,
          isFetching: false,
          error: false,
          success: true,
          message: null,
        },
        login: {
          ...state.login,
          auth: {
            accessToken: null,
            refreshToken: null,
          },
        },
      };

    case AuthActionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        logout: {
          ...state.logout,
          isFetching: false,
          error: true,
          success: false,
          message: action.payload,
        },
      };
    case AuthActionTypes.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          auth: {
            ...state.login.auth,
            accessToken: action.payload,
          },
        },
      };
    default: {
      return state;
    }
  }
};
export default authReducer;
