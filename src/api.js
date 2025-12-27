import axios from "axios";

const api = axios.create({
  baseURL: "https://api.bazzaro.uz/api", // ✅ REAL BACKEND
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("seller");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
