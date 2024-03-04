import axios from 'axios';

const API_BASE_URL = 'https://h04lj3hflb.execute-api.eu-west-3.amazonaws.com/dev';

const AnalyticsService = {
  fetchUserAnalytics: async (userId) => {
    // Existing code remains the same
  },

  // New method for fetching all analytics data
  fetchAllAnalytics: async () => {
    try {
      const url = `${API_BASE_URL}/analytics/all`; // Use the new endpoint
      const response = await axios.get(url);
      return response.data; // Adjust based on your API's response structure
    } catch (error) {
      console.error('Fetch all analytics error:', error);
      throw error;
    }
  },
};

export default AnalyticsService;

