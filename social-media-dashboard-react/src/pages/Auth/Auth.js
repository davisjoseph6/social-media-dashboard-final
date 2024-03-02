import React from 'react';
import './auth.css'; // Make sure this matches the actual CSS filename

function Auth() {
  // Your Cognito Hosted UI URL
  const cognitoUrl = 'https://social-media.auth.eu-west-3.amazoncognito.com/login?client_id=1o51h8nhgrbjbmklokco557hbm&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fmmiff6t9og.execute-api.eu-west-3.amazonaws.com%2Fdev%2Fposts';

  return (
    <div className="auth">
      <h1>Welcome to AI-Social-Media</h1>
      <button onClick={() => window.location.href = cognitoUrl}>Sign In / Login</button>
    </div>
  );
}

export default Auth;

