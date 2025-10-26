// src/api/axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000/api", // changed to backend PORT=9000
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor for debugging
api.interceptors.request.use((request) => {
  console.log("Request:", request);
  return request;
});

// Add interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log the full error response for debugging
    console.log("API Error Details:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.response?.data?.message,
    });

    // Extract the error message from the backend response
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Something went wrong";

    // Create a new error with the extracted message
    const enhancedError = new Error(errorMessage);
    // Preserve the original error details
    enhancedError.status = error.response?.status;
    enhancedError.data = error.response?.data;
    enhancedError.response = error.response; // preserve original axios response

    return Promise.reject(enhancedError);
  }
);

export default api;