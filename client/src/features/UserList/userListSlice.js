import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../apis/userApi";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const data = await userApi.getAll();
  return data;
});

const initialState = {
  listUser: [],
  isFetching: false,
  isError: false,
  message: "",
};

const userListSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isFetching = false;
      state.listUser = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = userListSlice.actions;

export default userListSlice.reducer;
