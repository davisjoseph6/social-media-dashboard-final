import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Ensure this import path is correct for your CSS file

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item"><Link to="/">Home</Link></li>
        <li className="nav-item"><Link to="/posting">Posts</Link></li>
        <li className="nav-item"><Link to="/profile">Profile</Link></li>
        <li className="nav-item"><Link to="/analytics">Analytics</Link></li>
        <li className="nav-item"><Link to="/messaging">Messaging</Link></li>
        <li className="nav-item"><Link to="/chatbot">Chatbot</Link></li>
        <li className="nav-item"><Link to="/auth">Login/Signup</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;

