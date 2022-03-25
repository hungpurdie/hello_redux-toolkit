const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  isLoaded: false,
  isError: false,
  error: null,
  data: null,
};

const captchaSlice = createSlice({
  name: "captcha",
  initialState,
  reducers: {
    requestCaptcha: (state) => {
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {},
});

export const { requestCaptcha } = captchaSlice.actions;
export default captchaSlice.reducer;
