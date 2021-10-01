const { UserActionTypes } = require('../actions/userActionTypes');

const initialState = {
  users: [],
  isFetching: false,
  errorMessage: '',
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.FETCH_START:
      return {
        ...state,
        isFetching: true,
      };
    case UserActionTypes.FETCH_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        isFetching: false,
        users: action.payload,
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
