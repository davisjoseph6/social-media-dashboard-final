// Importing Axios for making HTTP requests
import axios from 'axios';

const API_BASE_URL = 'https://mmiff6t9og.execute-api.eu-west-3.amazonaws.com/dev';

const PostService = {
  // Method to fetch posts
  fetchPosts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`);
      // Adjusted to extract the 'posts' array from the response
      return response.data.posts; // Ensure this matches your actual API response structure
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  // Method to create a new post
  createPost: async (postData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts`, postData);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  // Add more methods for updating or deleting posts as needed
};

export default PostService;

