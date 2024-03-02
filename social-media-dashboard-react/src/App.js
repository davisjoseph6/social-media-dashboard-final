import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
        <Switch>
          {/* Define routes for your pages */}
          <Route path="/auth" component={Auth} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/chatbot" component={Chatbot} />
          <Route path="/messaging" component={Messaging} />
          <Route path="/posting" component={Posting} />
          <Route path="/profile" component={Profile} />
          {/* Redirect to /auth as the default route */}
          <Route path="/" exact component={Auth} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

