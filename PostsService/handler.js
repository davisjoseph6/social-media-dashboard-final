// PostsService/handler.js
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { POSTS_TABLE } = process.env;

module.exports.createPost = async (event) => {
    console.log("Received event:", event);
    const { userId, content } = JSON.parse(event.body);

    const params = {
        TableName: POSTS_TABLE,
        Item: {
            postId: userId + ":" + Date.now(), // Constructing a unique post ID
            userId,
            content,
            createdAt: new Date().toISOString(),
        },
    };

    try {
        await dynamoDb.put(params).promise();
        console.log("Post created successfully with params:", params);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Post created successfully' }),
        };
    } catch (error) {
        console.error("Error creating post with params:", params, "; Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not create post', details: error.toString() }),
        };
    }
};

