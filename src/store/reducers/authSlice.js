import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../apis/authApi";
import showToast, { toastPosition } from "../../configs/toast";

const refreshToken = createAction("auth/refreshToken");
const logout = createAction("auth/logout");

export const getRefreshToken = createAsyncThunk(
  refreshToken.type,
  async (token, { rejectWithValue }) => {
    try {
      const data = await authApi.refreshToken(token);
      return data.elements;
    } catch (error) {
      debugger;
      const { status, message } = error.response.data;
      return rejectWithValue({ status, message });
    }
  }
);

export const getLogout = createAsyncThunk(
  logout.type,
  async (refreshToken, { rejectWithValue }) => {
    try {
      const data = await authApi.logout(refreshToken);
      return data.message;
    } catch (error) {
      const { message, status } = error.response.data;
      if (status === 401) {
        return rejectWithValue(message);
      }
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  isError: false,
  message: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    removeToken: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRefreshToken.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getRefreshToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      showToast("success", "Token refreshed", toastPosition.bottomRight);
    });
    builder.addCase(getRefreshToken.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      if (action.payload.message === "jwt expired" && action.payload.status === 500) {
        debugger;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        showToast("error", "Session expired, please login again", toastPosition.bottomRight);
      }
    });

    builder.addCase(getLogout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLogout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.message = null;
      state.isError = false;
      state.isAuthenticated = false;
      showToast("success", action.payload, toastPosition.topRight);
    });
    builder.addCase(getLogout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isAuthenticated = false;
      state.message = action.payload;
    });
  },
});

export const { saveToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
