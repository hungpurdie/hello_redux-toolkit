import axios from 'axios';
import { AuthActionTypes } from './authActionTypes';

export const loginSuccess = (token) => {
  return {
    type: AuthActionTypes.LOGIN_SUCCESS,
    payload: token,
  };
};

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const { data } = await axios.post(
      'https://codersx-swagger.glitch.me/api/auth/login',
      { email, password }
    );
    dispatch(loginSuccess(data));
  };
