import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
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
        <Routes>
          {/* Update routes for React Router v6 */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/posting" element={<Posting />} />
          <Route path="/profile" element={<Profile />} />
          {/* Redirect to /auth as the default route */}
          <Route path="/" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

