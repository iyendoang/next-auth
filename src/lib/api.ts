// services/api.ts
import axios from "axios";
import { getCookie } from "cookies-next";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND, // Use environment variable for API base URL
  headers: {
    "Content-Type": "application/json", // Ensure all requests are sent as JSON
  },
});

api.interceptors.request.use((config) => {
  const token = getCookie("token"); // Get token from cookies
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // Attach token to headers if it exists
  }
  return config;
});

export default api;
