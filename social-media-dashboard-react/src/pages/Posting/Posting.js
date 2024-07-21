import React, { useEffect, useState } from 'react';
import PostService from '../../services/PostService'; // Adjust the import path if necessary
import './posting.css';

function Posting() {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await PostService.fetchPosts();
      setPosts(fetchedPosts || []);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await PostService.likePost(postId);
      fetchPosts(); // Refresh the posts list to show the updated likes count
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleCreatePost = async (event) => {
    event.preventDefault();
    try {
      await PostService.createPost({ content: newPostContent });
      setNewPostContent('');
      fetchPosts(); // Refresh posts after adding a new one
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await PostService.deletePost(postId);
      fetchPosts(); // Refresh posts after deleting
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="posting">
      <h1>Posts</h1>
      <form onSubmit={handleCreatePost} className="post-form">
        <textarea 
          placeholder="What's on your mind?"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
      {posts.map((post) => (
        <div key={post.postId} className="post">
          <img src="placeholder-profile-pic.png" alt="Profile" className="profile-pic" />
          <div className="post-content">
            {/* Conditionally rendering to handle missing userId */}
            <h3>{post.userId ? post.userId.split('@')[0] : 'Unknown'}</h3>
            <p>{post.content}</p>
            <div className="post-actions">
              <button onClick={() => handleLike(post.postId)}>Like</button>
              <span>{post.likes || 0} Likes</span>
              <button onClick={() => handleDeletePost(post.postId)} style={{marginLeft: "10px"}}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posting;

