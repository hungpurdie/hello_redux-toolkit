import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (next) => {
    return Promise.resolve(next);
  },
  (error) => {
    return Promise.reject(error);
  }
);

const todoApi = {
  fetchTodos: () => {
    const url = "https://jsonplaceholder.typicode.com/todos";
    return axiosInstance.get(url);
  },
};

export default todoApi;
