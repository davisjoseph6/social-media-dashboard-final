import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid'; // For generating unique session IDs

// Configure AWS SDK for JavaScript with default settings
// This setup assumes other AWS services might be used in the eu-west-3 region
AWS.config.update({
  region: 'eu-west-3', // Default region for services
});

// Configure credentials for Cognito explicitly with its region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'eu-west-3:13ba40ea-518f-4e37-b188-3e17e1d73785',
  region: 'eu-west-3', // Ensure Cognito uses eu-west-3
});

// Instantiate LexRuntimeV2 service for Amazon Lex with eu-west-2 region explicitly set
const lexruntimev2 = new AWS.LexRuntimeV2({
  region: 'eu-west-2', // Amazon Lex is in eu-west-2
});

const ChatbotService = {
  sendMessageToBot: async (message) => {
    const params = {
      botAliasId: 'TSTALIASID', // Your Lex bot alias ID
      botId: 'NV2GPBSZDM', // Your Lex bot ID
      localeId: 'en_US',
      sessionId: uuidv4(), // Generate a unique sessionId for each request
      text: message,
    };

    return new Promise((resolve, reject) => {
      lexruntimev2.recognizeText(params, function(err, data) {
        if (err) {
          console.error("Error:", err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
};

export default ChatbotService;

