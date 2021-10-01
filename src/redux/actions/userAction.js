import axios from 'axios';
import { UserActionTypes } from './userActionTypes';

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
  return (dispatch) => {
    dispatch(fetchUserStart());
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        const data = res.data.map((item) => ({
          id: item.id,
          username: item.username,
          email: item.email,
        }));
        dispatch(fetchUserSuccess(data));
      })

      .catch((err) => {
        dispatch(fetchUserFailure(err.errorMessage));
      });
  };
};
