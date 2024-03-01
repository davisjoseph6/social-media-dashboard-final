const AWS = require('aws-sdk');
// Update for Lex V2
const lexruntimev2 = new AWS.LexRuntimeV2({ region: 'eu-west-2' });
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-3' });

module.exports.chatbotInteraction = async (event) => {
    const userMessage = JSON.parse(event.body).message;

    // Updated parameters for Lex V2
    const params = {
        botId: 'NV2GPBSZDM', // Your Lex V2 bot ID
        botAliasId: 'TSTALIASID', // Your Lex bot alias ID
        localeId: 'en_US',
        sessionId: 'WebUser', // A unique session ID for the user
        text: userMessage,
    };

    try {
        const lexResponse = await lexruntimev2.recognizeText(params).promise();
        let responseMessage = "How can I assist you?"; // Default response

        // Assuming you get the intent name from Lex V2 response correctly
        // Note: Adjust based on actual Lex V2 response structure
        if (lexResponse.interpretations[0].intent.name === 'CheckAnalytics') {
            // Example: Fetch analytics data for the user. Adjust based on your Lex slots and DynamoDB structure.
            const dynamoParams = {
                TableName: "analyticsTable",
                KeyConditionExpression: "userId = :userId",
                ExpressionAttributeValues: {
                    ":userId": 'someUserId', // Update this based on how you determine the user's ID
                },
            };

            const data = await dynamoDb.query(dynamoParams).promise();
            responseMessage = `You have ${data.Items.length} analytics records.`; // Customize this message based on your needs
        } else {
            // Handling for non-'CheckAnalytics' intents
            // Use lexResponse.messages for Lex V2 response messages
            responseMessage = lexResponse.messages[0]?.content || "I'm not sure how to help with that.";
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: responseMessage }),
        };
    } catch (error) {
        console.error('Lex conversation error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error processing your message' }),
        };
    }
};

