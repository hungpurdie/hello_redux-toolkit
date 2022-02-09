import axios from "axios";
import { AuthActionTypes } from "./types/authActionTypes";

export const loginSuccess = (token) => {
  return {
    type: AuthActionTypes.LOGIN_SUCCESS,
    payload: token,
  };
};

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const data = await axios.post("http://13.250.46.59:8080/account/login", {
      Username: email,
      Password: password,
    });
    if (data?.status === 200 && data?.data?.accessToken && data.data.refreshToken) {
      dispatch(
        loginSuccess({ accessToken: data.data.accessToken, refreshToken: data.data.refreshToken })
      );
    }
  };

export const refreshTokenSuccess = (accessToken) => {
  return {
    type: AuthActionTypes.REFRESH_TOKEN_SUCCESS,
    payload: accessToken,
  };
};

export const refreshToken = (refreshToken) => async (dispatch) => {
  const data = await axios.post("http://13.250.46.59:8080/auth/refresh-token", {
    refreshToken,
  });

  if (data?.status === 200 && data?.data?.accessToken) {
    dispatch(refreshTokenSuccess(data.data.accessToken));
  }
};

export const logout = () => {
  return {
    type: AuthActionTypes.LOGOUT,
    payload: null,
  };
};
