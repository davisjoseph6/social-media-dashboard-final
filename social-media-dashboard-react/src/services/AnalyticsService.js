import axios from 'axios';

const API_BASE_URL = 'https://h04lj3hflb.execute-api.eu-west-3.amazonaws.com/dev';

const AnalyticsService = {
  fetchUserAnalytics: async (userId) => {
    // Existing code remains the same
  },

  // Existing method for fetching all analytics data
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

  // New method to fetch QuickSight embed URL
  fetchQuickSightEmbedUrl: async () => {
    try {
      // Endpoint should be implemented in your backend to securely generate and return the QuickSight embed URL
      const url = `${API_BASE_URL}/quicksight-embed-url`;
      const response = await axios.get(url);
      return response.data.url; // Ensure this matches your backend's response structure for the embed URL
    } catch (error) {
      console.error('Error fetching QuickSight embed URL:', error);
      throw error;
    }
  },
};

export default AnalyticsService;

