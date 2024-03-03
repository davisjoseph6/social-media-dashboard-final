// MessagingService/handler.js
const AWS = require('aws-sdk');
const awsIot = require('aws-iot-device-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { MESSAGES_TABLE } = process.env;
AWS.config.update({ region: 'eu-west-3' }); // Update this to your region
const secretsManager = new AWS.SecretsManager();

async function getSecretValue(secretName) {
    return new Promise((resolve, reject) => {
        secretsManager.getSecretValue({ SecretId: secretName }, (err, data) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(data.SecretString);
            }
        });
    });
}

exports.sendMessage = async (event) => {
    // Retrieve IoT credentials from Secrets Manager
    const secretName = "IoT_Instant_messaging"; // The name of your secret in Secrets Manager
    let iotCredentials;
    try {
        const secretValue = await getSecretValue(secretName);
        iotCredentials = JSON.parse(secretValue);
    } catch (error) {
        console.error("Error retrieving IoT credentials: ", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to retrieve IoT credentials' }),
        };
    }

    const { senderId, receiverId, content } = JSON.parse(event.body);
    const timestamp = new Date().getTime();
    const messageId = `${senderId}:${timestamp}`;
    const conversationId = [senderId, receiverId].sort().join(':');

    const params = {
        TableName: MESSAGES_TABLE,
        Item: {
            messageId,
            conversationId,
            senderId,
            receiverId,
            timestamp,
            content,
        },
    };

    try {
        await dynamoDb.put(params).promise();
        // Connect to AWS IoT
        const device = awsIot.device({
            keyPath: iotCredentials.privateKey,
            certPath: iotCredentials.certificate,
            caPath: iotCredentials.caCertificate,
            clientId: `sendMessageLambda-${Math.floor(Math.random() * 100000)}`,
            host: 'a1wqb40c1562d3-ats.iot.eu-west-3.amazonaws.com'
        });

        device.on('connect', function() {
            console.log('Connected to AWS IoT');
            const topic = `messaging/${conversationId}`;
            const messagePayload = JSON.stringify({
                messageId,
                conversationId,
                senderId,
                receiverId,
                timestamp,
                content,
            });

            // Publish message
            device.publish(topic, messagePayload, () => {
                console.log('Message published to topic', topic);
                device.end(); // End the connection
            });
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Message sent successfully' }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not send message' }),
        };
    }
};

exports.getMessages = async (event) => {
    const { conversationId } = event.pathParameters;

    const params = {
        TableName: MESSAGES_TABLE,
        IndexName: 'ConversationIndex',
        KeyConditionExpression: 'conversationId = :conversationId',
        ExpressionAttributeValues: {
            ':conversationId': conversationId,
        },
    };

    try {
        const data = await dynamoDb.query(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not retrieve messages' }),
        };
    }
};

