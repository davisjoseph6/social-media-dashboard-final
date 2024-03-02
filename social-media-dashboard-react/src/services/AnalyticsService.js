import axios from 'axios';

const API_BASE_URL = 'https://h04lj3hflb.execute-api.eu-west-3.amazonaws.com/dev/analytics/{userId}';

const AnalyticsService = {
  fetchUserAnalytics: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/analytics/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Fetch analytics error:', error);
      throw error;
    }
  },

  // More analytics-related methods can be added
};

export default AnalyticsService;

