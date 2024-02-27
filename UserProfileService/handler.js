// UserProfileService/handler.js
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { USER_PROFILES_TABLE } = process.env;

// Function to create or update a user profile
exports.updateUserProfile = async (event) => {
    const { userId, name, email } = JSON.parse(event.body);

    const params = {
        TableName: USER_PROFILES_TABLE,
        Item: {
            userId,
            name,
            email,
            updatedAt: new Date().toISOString(),
        },
    };

    try {
        await dynamoDb.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User profile updated successfully' }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not update user profile' }),
        };
    }
};

