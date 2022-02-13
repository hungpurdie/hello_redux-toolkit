import axiosClient from "./axiosClient";

const authApi = {
  login: async (user) => {
    const url = "account/login";
    return axiosClient.post(url, {
      Username: user.email,
      Password: user.password,
    });
  },

  loginWithGoogle: (tokenId) => {
    const url = "account/login-by-google";
    return axiosClient.post(url, {
      token: tokenId,
    });
  },

  refreshToken: (refreshToken) => {
    const url = "auth/refresh-token";
    return axiosClient.post(url, {
      refreshToken,
    });
  },
  verifyCaptcha: (response) => {
    const url = `auth/captcha/${response}`;
    return axiosClient.get(url);
  },
};

export default authApi;
