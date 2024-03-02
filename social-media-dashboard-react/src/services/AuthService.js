import axios from 'axios';

const API_BASE_URL = 'https://your-auth-service-url.com';

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      // Handle login success, e.g., storing the token
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  signup: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, userData);
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  // Additional methods like logout or token refresh could be here
};

export default AuthService;

