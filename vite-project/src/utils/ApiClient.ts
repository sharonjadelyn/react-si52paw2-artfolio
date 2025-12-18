import axios from "axios";

const ApiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    Accept: "application/json"
  }
});

// REQUEST
ApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("AuthToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE
ApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/signIn"
    ) {
      localStorage.removeItem("AuthToken");
      window.location.href = "/signIn";
    }

    return Promise.reject(error);
  }
);

export default ApiClient;