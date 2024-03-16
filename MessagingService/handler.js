// MessagingService/handler.js
const AWS = require('aws-sdk');
const awsIot = require('aws-iot-device-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { MESSAGES_TABLE, COGNITO_IDENTITY_POOL_ID } = process.env;
AWS.config.update({ region: 'eu-west-3' });

// Note: The function getSecretValue and writeCredentialsToTempFiles are no longer needed with the Cognito approach.

async function getCognitoCredentials() {
    // Configure Cognito to use the Identity Pool
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: COGNITO_IDENTITY_POOL_ID,
    });

    // Get AWS credentials
    await AWS.config.credentials.getPromise();
    return AWS.config.credentials;
}

exports.sendMessage = async (event) => {
    const { senderId, receiverId, content } = JSON.parse(event.body);
    const timestamp = new Date().getTime();
    const messageId = `${senderId}:${timestamp}`;
    const conversationId = [senderId, receiverId].sort().join(':');

    try {
        // Use Cognito to obtain temporary credentials
        const credentials = await getCognitoCredentials();

        // Initialize AWS IoT Device with Cognito temporary credentials
        const device = awsIot.device({
            accessKeyId: credentials.accessKeyId,
            secretKey: credentials.secretAccessKey,
            sessionToken: credentials.sessionToken,
            clientId: `sendMessageLambda-${Math.floor(Math.random() * 100000)}`,
            host: 'a1wqb40c1562d3-ats.iot.eu-west-3.amazonaws.com'
        });

        device.on('connect', () => {
            console.log('Connected to AWS IoT');
            const topic = `messaging/${conversationId}`;
            const messagePayload = JSON.stringify({ messageId, conversationId, senderId, receiverId, timestamp, content });

            device.publish(topic, messagePayload, () => {
                console.log(`Message published to topic ${topic}`);
                device.end(); // Disconnect from AWS IoT
            });
        });

        const params = {
            TableName: MESSAGES_TABLE,
            Item: { messageId, conversationId, senderId, receiverId, timestamp, content },
        };
        await dynamoDb.put(params).promise();
        return { statusCode: 200, body: JSON.stringify({ message: 'Message sent successfully' }) };
    } catch (error) {
        console.error("Error:", error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send message' }) };
    }
};

exports.getMessages = async (event) => {
    const { conversationId } = event.pathParameters;
    const params = {
        TableName: MESSAGES_TABLE,
        IndexName: 'ConversationIndex',
        KeyConditionExpression: 'conversationId = :conversationId',
        ExpressionAttributeValues: { ':conversationId': conversationId },
    };

    try {
        const data = await dynamoDb.query(params).promise();
        return { statusCode: 200, body: JSON.stringify(data.Items) };
    } catch (error) {
        console.error("Error:", error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Could not retrieve messages' }) };
    }
};

