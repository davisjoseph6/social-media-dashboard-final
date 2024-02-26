// PostsService/handler.js

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { POSTS_TABLE } = process.env;

// Import the AnalyticsService module
const AnalyticsService = require('./AnalyticsService/handler.js');

// Function to handle post creation
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
            likes: 0, // Initialize likes count
        },
    };

    try {
        await dynamoDb.put(params).promise();
        console.log("Post created successfully with params:", params);
        
        // Insert analytics data after creating the post
        await AnalyticsService.insertAnalyticsData(userId, { action: 'post_created', contentLength: content.length });
        
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

// Function to handle post deletion
module.exports.deletePost = async (event) => {
    console.log("Received event for deletion:", event);
    const postId = event.pathParameters.postId;

    const params = {
        TableName: POSTS_TABLE,
        Key: {
            postId: postId,
        },
    };

    try {
        await dynamoDb.delete(params).promise();
        console.log("Post deleted successfully with params:", params);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Post deleted successfully' }),
        };
    } catch (error) {
        console.error("Error deleting post with params:", params, "; Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not delete post', details: error.toString() }),
        };
    }
};

// Function to handle liking a post
module.exports.likePost = async (event) => {
    const postId = event.pathParameters.postId;

    // Attempt to retrieve the current likes for the post
    const getParams = {
        TableName: POSTS_TABLE,
        Key: { postId },
    };

    try {
        const result = await dynamoDb.get(getParams).promise();
        const currentLikes = result.Item.likes || 0;

        // Increment the like count
        const updateParams = {
            TableName: POSTS_TABLE,
            Key: { postId },
            UpdateExpression: "set likes = :likes",
            ExpressionAttributeValues: {
                ":likes": currentLikes + 1,
            },
            ReturnValues: "UPDATED_NEW",
        };

        await dynamoDb.update(updateParams).promise();

        // Optionally, update analytics after liking the post
        await AnalyticsService.insertAnalyticsData(result.Item.userId, { action: 'post_liked', postId: postId, likes: currentLikes + 1 });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Post liked successfully' }),
        };
    } catch (error) {
        console.error("Error liking post:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not like post', details: error.toString() }),
        };
    }
};

