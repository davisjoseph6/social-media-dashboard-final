import axios from 'axios';

const API_BASE_URL = 'https://your-profile-service-url.com';

const ProfileService = {
  fetchUserProfile: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/profile/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Fetch user profile error:', error);
      throw error;
    }
  },

  updateUserProfile: async (userId, profileData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/profile/${userId}`, profileData);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  // Additional methods as needed
};

export default ProfileService;

