import axios from 'axios';

const API_BASE_URL = 'https://cf4uidzza4.execute-api.eu-west-3.amazonaws.com/dev/chatbot';

const ChatbotService = {
  sendMessageToBot: async (message) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/chatbot`, { message });
      return response.data;
    } catch (error) {
      console.error('Chatbot service error:', error);
      throw error;
    }
  },

  // Additional interactions with the chatbot could be defined here
};

export default ChatbotService;

