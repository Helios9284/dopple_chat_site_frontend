import axios from 'axios';

const instance = axios.create({
  // baseURL: process.env.REACT_APP_API_URL
  baseURL: process.env.REACT_APP_API_URL
  // baseURL: "https://dopple-api-temp.onrender.com"
  // baseURL: "http://localhost:4001"
});

instance.interceptors.request.use(
  config => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization = `${token}`;
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

export default instance;