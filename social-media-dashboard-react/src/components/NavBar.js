import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/posting">Posts</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
        <li><Link to="/messaging">Messaging</Link></li>
        <li><Link to="/chatbot">Chatbot</Link></li>
        <li><Link to="/auth">Login/Signup</Link></li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
}

export default NavBar;

