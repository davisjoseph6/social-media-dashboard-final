import axios from 'axios';

// Updated base URL to match your API's base path
const API_BASE_URL = 'https://l6idca5v2j.execute-api.eu-west-3.amazonaws.com/dev';

const MessageService = {
  // Updated sendMessage method to use the correct API endpoint
  sendMessage: async (messageData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/messages/send`, messageData);
      return response.data;
    } catch (error) {
      console.error('Send message error:', error);
      throw error;
    }
  },

  // Updated fetchMessages method to use the correct API endpoint
  fetchMessages: async (conversationId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/messages/retrieve/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error('Fetch messages error:', error);
      throw error;
    }
  },

  // More methods as needed
};

export default MessageService;

