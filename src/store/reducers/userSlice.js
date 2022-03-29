import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  isFetching: false,
  error: false,
  success: false,
  message: null,
  countError: 0,
};

const getMe = createAsyncThunk({
  "user/getMe": async (token, { rejectWithValue, dispatch }) => {},
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
