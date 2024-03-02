import React, { useEffect, useState } from 'react';
import { PostService } from '../../services'; // Adjust the import path as necessary
import './posting.css';

function Posting() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await PostService.fetchPosts();
        console.log(data); // Log the data received from fetchPosts
        setPosts(data); // Update the state with the fetched posts
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="posting">
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.content}</li> // Adjust according to your data structure
        ))}
      </ul>
    </div>
  );
}

export default Posting;

