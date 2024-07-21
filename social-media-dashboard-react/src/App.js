import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import NavBar from './components/NavBar'; // Ensure this import path is correct

// Importing pages
import Analytics from './pages/Analytics/Analytics';
import Auth from './pages/Auth/Auth';
import Chatbot from './pages/Chatbot/Chatbot';
import Messaging from './pages/Messaging/Messaging';
import Posting from './pages/Posting/Posting';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar /> {/* This will make NavBar visible on all pages */}
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/posting" element={<Posting />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Auth />} /> {/* Consider having a Home or Landing page as the default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

