import axios from 'axios';

// Corrected base URL (removed the /analytics/{userId} part)
const API_BASE_URL = 'https://h04lj3hflb.execute-api.eu-west-3.amazonaws.com/dev';

const AnalyticsService = {
  // Correctly constructs the URL using the provided userId
  fetchUserAnalytics: async (userId) => {
    try {
      // Constructs the correct URL by inserting the userId into the path
      const url = `${API_BASE_URL}/analytics/${userId}`;
      const response = await axios.get(url);
      // Assuming the response directly contains the data you need; adjust as necessary
      return response.data;
    } catch (error) {
      console.error('Fetch analytics error:', error);
      throw error;
    }
  },

  // More analytics-related methods can be added here as needed
};

export default AnalyticsService;

