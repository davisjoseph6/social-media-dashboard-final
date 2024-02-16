// PostsService/handler.js
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { POSTS_TABLE } = process.env;

module.exports.createPost = async (event) => {
    const { userId, content } = JSON.parse(event.body);

    const params = {
        TableName: POSTS_TABLE,
        Item: {
            postId: userId + ":" + Date.now(), // Simple example for a unique post ID
            userId,
            content,
            createdAt: new Date().toISOString(),
        },
    };

    try {
        await dynamoDb.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Post created successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not create post' }),
        };
    }
};

