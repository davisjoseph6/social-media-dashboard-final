import React from 'react';
import './auth.css'; // Make sure this matches the actual CSS filename

function Auth() {
  // Corrected Cognito Hosted UI URL to use the updated redirect_uri as per the amplifyconfiguration.json settings
  const cognitoUrl = 'https://social-media.auth.eu-west-3.amazoncognito.com/login?client_id=1o51h8nhgrbjbmklokco557hbm&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fposting';

  return (
    <div className="auth">
      <h1>Welcome to AI IoT Social-Media</h1>
      <button onClick={() => window.location.href = cognitoUrl}>Sign In / Login</button>
      <p>Deployed with Amazon AWS Cloud. By Davis Joseph for Holberton Paris</p>
    </div>
  );
}

export default Auth;

