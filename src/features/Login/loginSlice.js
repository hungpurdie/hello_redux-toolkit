import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../apis/authApi";
import { saveToken } from "../../store/reducers/authSlice";
import showToast, { toastPosition } from "../../configs/toast";

export const login = createAsyncThunk(
  "login/login",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const data = await authApi.login({ email, password });
      const { elements, message } = data;
      dispatch({
        type: saveToken.type,
        payload: elements,
      });
      return message;
    } catch (error) {
      const { message, status } = error?.response.data;
      if (message === "Unauthorized" && status === 401) {
        const message = "Invalid email or password";
        return rejectWithValue(message);
      } else if (status === 500) {
        return rejectWithValue(message);
      }
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  isFetching: false,
  error: false,
  success: false,
  message: null,
  countError: 0,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isFetching = false;
      state.success = true;
      state.message = action.payload;
      showToast("success", action.payload, toastPosition.topRight, {
        pauseOnHover: false,
      });
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.message = action.payload;
      state.countError += 1;
      showToast("error", action.payload, toastPosition.topRight);
    });
  },
});

export const { loginError, loginStart, loginSuccess } = loginSlice.actions;
export default loginSlice.reducer;
