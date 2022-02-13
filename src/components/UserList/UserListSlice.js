import { UserActionTypes } from "redux/actions/types/user";

const initialState = {
  listUser: [],
  isFetching: false,
  errorMessage: "",
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case UserActionTypes.FETCH_START:
    return {
      ...state,
      isFetching: true,
    };
  case UserActionTypes.FETCH_SUCCESS:
    return {
      ...state,
      isFetching: false,
      listUser: action.payload,
    };
  case UserActionTypes.FETCH_FAILURE:
    return {
      ...state,
      isFetching: false,
      errorMessage: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;