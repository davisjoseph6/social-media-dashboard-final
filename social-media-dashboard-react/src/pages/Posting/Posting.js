import React, { useEffect, useState } from 'react';
import PostService from '../../services/PostService'; // Adjust the import path if necessary
import './posting.css';

function Posting() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await PostService.fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    }
    fetchData();
  }, []);

  const handleLike = async (postId) => {
    try {
      await PostService.likePost(postId);
      // Optimistically update the UI (or you could refetch the posts)
      setPosts(posts.map(post => {
        if (post.postId === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      }));
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  return (
    <div className="posting">
      <h1>Posts</h1>
      {posts.map(post => (
        <div key={post.postId} className="post">
          <img src="placeholder-profile-pic.png" alt="Profile" className="profile-pic" />
          <div className="post-content">
            <h3>{post.userId.split('@')[0]}</h3>
            <p>{post.content}</p>
            <div className="post-actions">
              <button onClick={() => handleLike(post.postId)}>Like</button>
              <span>{post.likes} Likes</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posting;

