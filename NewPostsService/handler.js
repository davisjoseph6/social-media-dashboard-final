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
            postId: userId + ":" + Date.now(),
            userId,
            content,
            createdAt: new Date().toISOString(),
            likes: 0,
        },
    };

    try {
        await dynamoDb.put(params).promise();
        console.log("Post created successfully with params:", params);
        
        await AnalyticsService.insertAnalyticsData(userId, { action: 'post_created', contentLength: content.length });
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Post created successfully' }),
            headers: {
                "Access-Control-Allow-Origin": "*", // Allows requests from any origin
                "Access-Control-Allow-Credentials": "true", // Required for cookies, authorization headers with HTTPS
            }
        };
    } catch (error) {
        console.error("Error creating post with params:", params, "; Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not create post', details: error.toString() }),
            headers: {
                "Access-Control-Allow-Origin": "*", // Make sure to include CORS headers in error responses as well
            }
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
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        };
    } catch (error) {
        console.error("Error deleting post with params:", params, "; Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not delete post', details: error.toString() }),
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        };
    }
};

// Function to handle liking a post
module.exports.likePost = async (event) => {
    const postId = event.pathParameters.postId;

    const getParams = {
        TableName: POSTS_TABLE,
        Key: { postId },
    };

    try {
        const result = await dynamoDb.get(getParams).promise();
        const currentLikes = result.Item.likes || 0;

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
        
        await AnalyticsService.insertAnalyticsData(result.Item.userId, { action: 'post_liked', postId: postId, likes: currentLikes + 1 });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Post liked successfully' }),
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        };
    } catch (error) {
        console.error("Error liking post:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not like post', details: error.toString() }),
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        };
    }
};

// New function to handle reading/displaying posts
module.exports.readPosts = async () => {
    const params = {
        TableName: POSTS_TABLE,
    };

    try {
        const data = await dynamoDb.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ posts: data.Items }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            }
        };
    } catch (error) {
        console.error("Error reading posts:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not read posts', details: error.toString() }),
        };
    }
};

