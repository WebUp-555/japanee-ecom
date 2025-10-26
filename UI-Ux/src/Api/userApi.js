import api from "./axiosInstance.js";

export const registerUser = async (userData) => {
  const res = await api.post("/v1/users/register", userData); // keep /v1
  return res.data;
};

export const loginUser = async (emailOrUsername, password) => {
    try {
        const isEmail = /\S+@\S+\.\S+/.test(emailOrUsername);
        const payload = isEmail
            ? { email: emailOrUsername, password }
            : { username: emailOrUsername, password };

        const response = await api.post("/v1/users/login", payload);
        return response.data;
    } catch (error) {
        // Log error details
        console.log('Login Error:', {
            message: error.message,
            originalError: error
        });
        
        // Re-throw the error with the specific message
        throw error;
    }
};

// logout API call — backend clears cookies and refreshToken
export const logoutUser = async () => {
  const res = await api.post("/v1/users/logout", null, { withCredentials: true });
  return res.data;
};