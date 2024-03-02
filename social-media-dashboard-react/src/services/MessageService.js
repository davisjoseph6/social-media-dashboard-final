import axios from 'axios';

const API_BASE_URL = 'https://your-message-service-url.com';

const MessageService = {
  sendMessage: async (messageData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/send`, messageData);
      return response.data;
    } catch (error) {
      console.error('Send message error:', error);
      throw error;
    }
  },

  fetchMessages: async (conversationId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/messages/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error('Fetch messages error:', error);
      throw error;
    }
  },

  // More methods as needed
};

export default MessageService;

