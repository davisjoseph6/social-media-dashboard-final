// MessagingService/handler.js
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { MESSAGES_TABLE, COGNITO_IDENTITY_POOL_ID } = process.env;
AWS.config.update({ region: 'eu-west-3' });

// Function to retrieve and refresh Cognito credentials
async function getCognitoCredentials() {
    const cognitoIdentity = new AWS.CognitoIdentity();
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: COGNITO_IDENTITY_POOL_ID,
    });

    // Manually refresh the credentials
    await AWS.config.credentials.getPromise();

    console.log("Cognito Credentials:", AWS.config.credentials);

    const params = {
        IdentityId: AWS.config.credentials.identityId,
        Logins: {} // Update with actual logins if necessary
    };

    const data = await cognitoIdentity.getCredentialsForIdentity(params).promise();
    AWS.config.update({
        accessKeyId: data.Credentials.AccessKeyId,
        secretAccessKey: data.Credentials.SecretKey,
        sessionToken: data.Credentials.SessionToken,
    });

    return AWS.config.credentials;
}

// Example function to demonstrate how to use AWS SDK for direct IoT interactions
async function publishMessageToIotTopic(credentials, topic, message) {
    const iot = new AWS.Iot();
    const endpoint = await iot.describeEndpoint({ endpointType: "iot:Data-ATS" }).promise();

    const iotData = new AWS.IotData({ endpoint: endpoint.endpointAddress });
    const params = {
        topic,
        payload: JSON.stringify(message),
        qos: 0
    };

    return iotData.publish(params).promise();
}

exports.sendMessage = async (event) => {
    const requestBody = JSON.parse(event.body);
    const { conversationId, senderId, receiverId, content } = requestBody;

    if (!conversationId || !senderId || !receiverId || !content) {
        console.error("Missing required fields in request body");
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
            },
            body: JSON.stringify({ error: 'Missing required fields' })
        };
    }

    const timestamp = new Date().getTime();
    const messageId = `${senderId}:${timestamp}`;
    const topic = `messaging/${conversationId}`;
    const messagePayload = { messageId, conversationId, senderId, receiverId, timestamp, content };

    try {
        const credentials = await getCognitoCredentials();
        await publishMessageToIotTopic(credentials, topic, messagePayload);
        console.log(`Message published to topic ${topic}`);

        const params = {
            TableName: MESSAGES_TABLE,
            Item: messagePayload,
        };
        await dynamoDb.put(params).promise();
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
            },
            body: JSON.stringify({ message: 'Message sent successfully' })
        };
    } catch (error) {
        console.error("Error in sendMessage:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
            },
            body: JSON.stringify({ error: 'Failed to send message' })
        };
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
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
            },
            body: JSON.stringify(data.Items)
        };
    } catch (error) {
        console.error("Error in getMessages:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
            },
            body: JSON.stringify({ error: 'Could not retrieve messages' })
        };
    }
};

