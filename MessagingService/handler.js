// MessagingService/handler.js
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { MESSAGES_TABLE } = process.env;

exports.sendMessage = async (event) => {
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

