const AWS = require('aws-sdk');
const lexruntime = new AWS.LexRuntime({ region: 'eu-west-1' });
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-3' }); // Ensure the region matches your DynamoDB table's region

module.exports.chatbotInteraction = async (event) => {
    const userMessage = JSON.parse(event.body).message;
    const params = {
        botAlias: '$LATEST',
        botName: 'Davis', // Updated to your Lex bot name
        inputText: userMessage,
        userId: 'WebUser',
    };

    try {
        const lexResponse = await lexruntime.postText(params).promise();
        let responseMessage = lexResponse.message;

        // Check if the intent from Lex matches 'CheckAnalytics'
        if (lexResponse.intentName === 'CheckAnalytics') {
            // Example: Fetch analytics data for the user. Adjust based on your Lex slots and DynamoDB structure.
            const dynamoParams = {
                TableName: "analyticsTable",
                KeyConditionExpression: "userId = :userId",
                ExpressionAttributeValues: {
                    ":userId": lexResponse.sessionAttributes.userId, // Assuming userId is stored in session attributes
                },
            };

            const data = await dynamoDb.query(dynamoParams).promise();
            responseMessage = `You have ${data.Items.length} analytics records.`; // Customize this message based on your needs
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: responseMessage }),
        };
    } catch (error) {
        console.error('Error processing the request:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error processing your message' }),
        };
    }
};

