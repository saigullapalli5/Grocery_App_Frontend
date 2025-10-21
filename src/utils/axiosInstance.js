// src/utils/axiosInstance.js
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5100/api", // your backend base URL
  withCredentials: true, // include cookies automatically
});

// Attach Authorization header from cookies if available (admin takes precedence)
axiosInstance.interceptors.request.use((config) => {
  try {
    const adminToken = Cookies.get("adminJwtToken");
    const userToken = Cookies.get("userJwtToken");
    const token = adminToken || userToken;
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } catch (_) {
    // noop
  }
  return config;
});

// Global handler for expired/invalid tokens
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      // Prevent duplicate handling if multiple requests fail simultaneously
      if (window.__handling401) return Promise.reject(error);
      window.__handling401 = true;

      // Show popup
      try { window.alert("Your session has expired or is invalid. Please log in again."); } catch (_) {}
      // Redirect to login if not already there (do not mutate cookies or header state here)
      const path = window.location?.pathname || "";
      if (path !== "/login" && path !== "/alogin") {
        try { window.location.replace("/login"); } catch (_) {}
      }
      // Release flag after navigation attempt
      setTimeout(() => { try { delete window.__handling401; } catch(_){} }, 0);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
