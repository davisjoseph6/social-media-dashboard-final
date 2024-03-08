import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid'; // For generating unique session IDs

// Configure AWS SDK for JavaScript
AWS.config.region = 'eu-west-2'; // Lex bot region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'eu-west-3:13ba40ea-518f-4e37-b188-3e17e1d73785', // Your Cognito Identity Pool ID in eu-west-3
  region: 'eu-west-3' // Cognito region
});

const lexruntime = new AWS.LexRuntimeV2();

const ChatbotService = {
  sendMessageToBot: async (message) => {
    const params = {
      botAliasId: 'TSTALIASID', // Your Lex bot alias ID
      botId: 'NV2GPBSZDM', // Your Lex bot ID
      localeId: 'en_US',
      sessionId: uuidv4(), // Generate a unique sessionId for each request or use a static value
      text: message,
    };

    return new Promise((resolve, reject) => {
      lexruntime.recognizeText(params, function(err, data) {
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

