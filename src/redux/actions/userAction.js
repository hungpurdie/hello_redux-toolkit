import axios from 'axios';
import { UserActionTypes } from './types/userActionTypes';

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

export const fetchUsersAsync = () => {
  return async (dispatch) => {
    dispatch(fetchUserStart());
    try {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      dispatch(fetchUserSuccess(data));
    } catch (error) {
      dispatch(fetchUserFailure(error.errorMessage));
    }
  };
};
