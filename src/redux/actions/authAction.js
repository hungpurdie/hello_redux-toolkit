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
    const {
      data: {
        elements: { accessToken, refreshToken },
      },
    } = await axios.post("https://api-starter.up.railway.app/api/v1/auth/login", {
      email,
      password,
    });
    dispatch(loginSuccess({ accessToken, refreshToken }));
  };

export const logout = () => {
  return {
    type: AuthActionTypes.LOGOUT,
  };
};
