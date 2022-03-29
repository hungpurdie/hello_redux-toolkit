import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../apis/authApi";
import showToast, { toastPosition } from "../../configs/toast";

const initialState = {
  isFetching: false,
  error: false,
  success: false,
  message: null,
  countError: 0,
};

export const register = createAsyncThunk(
  "register/register",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const data = await authApi.register({ username, email, password });
      return data.elements;
    } catch (error) {
      const { message, status } = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const registerSlice = createSlice({
  name: "register",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.isFetching = true;
      state.error = false;
      state.success = false;
      state.message = null;
      state.countError = 0;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.success = true;
      state.message = action.payload;
      state.countError = 0;
      showToast("success", action.payload, toastPosition.topBottom);
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.success = false;
      state.countError = state.countError + 1;
      state.message = action.payload;
      showToast("error", action.payload, toastPosition.bottomRight);
    });
  },
});

export default registerSlice.reducer;
