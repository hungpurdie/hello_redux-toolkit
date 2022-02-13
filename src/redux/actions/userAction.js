import userApi from "apis/userApi";
import { UserActionTypes } from "./types/user";

export const fetchUserStart = () => ({
  type: UserActionTypes.FETCH_START,
});

export const fetchUserSuccess = (users) => {
  return {
    type: UserActionTypes.FETCH_SUCCESS,
    payload: users,
  };
};

export const fetchUserFailure = (errorMessage) => ({
  type: UserActionTypes.FETCH_FAILURE,
  payload: errorMessage,
});

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUserStart());
    try {
      const users = await userApi.getAll();
      dispatch(fetchUserSuccess(users));
    } catch (error) {
      dispatch(fetchUserFailure(error.errorMessage));
    }
  };
};
