import axios from "axios";
import { getRefreshToken } from "../store/reducers/authSlice";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
});

export const interceptor = (store) => {
  axiosClient.interceptors.request.use(
    async (config) => {
      const accessToken = store?.getState()?.auth?.accessToken;
      if (!config.headers.Authorization && accessToken) {
        config.headers.Authorization = accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosClient.interceptors.response.use(
    (response) => {
      if (response && response.data) {
        return response.data;
      }
      return response;
    },
    (error) => {
      const refreshToken = store?.getState()?.auth?.refreshToken;
      const { status, message } = error.response;
      if (status === 401 && message === "Unauthorized") {
        // if (refreshToken) {
        //   store.dispatch(getRefreshToken(refreshToken));
        // }
      } else if (status === 401 && message === "jwt expired") {
        if (refreshToken) {
          store.dispatch(getRefreshToken(refreshToken));
        }
      }
      return Promise.reject(error);
    }
  );
};

export default axiosClient;
