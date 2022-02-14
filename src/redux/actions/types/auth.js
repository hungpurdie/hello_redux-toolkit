export const AuthActionTypes = {
  LOGIN_START: "user/login/start",
  LOGIN_FAILURE: "user/login/failure",
  LOGIN_SUCCESS: "user/login/success",
  LOGIN_GOOGLE_SUCCESS: "user/login/google/success",

  LOGOUT_START: "user/logout",
  LOGOUT_FAILURE: "user/logout/failure",
  LOGOUT_SUCCESS: "user/logout/success",

  REFRESH_TOKEN_SUCCESS: "user/refreshToken",

  VERIFY_CAPTCHA_SUCCESS: "auth/verifyCaptcha/success",
  VERIFY_CAPTCHA_FAILURE: "auth/verifyCaptcha/failure",
};
