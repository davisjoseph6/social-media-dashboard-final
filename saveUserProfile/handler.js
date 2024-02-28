// handler.js
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const USER_PROFILES_TABLE = process.env.USER_PROFILES_TABLE;

exports.saveUserProfile = async (event) => {
    const { userName: userId, request: { userAttributes } } = event;
    const { email, name, "custom:birthday": birthday, "custom:gender": gender, "custom:givenName": givenName, "custom:familyName": familyName } = userAttributes;

    const params = {
        TableName: USER_PROFILES_TABLE,
        Item: {
            userId,
            name,
            email,
            birthday,
            gender,
            givenName,
            familyName,
            updatedAt: new Date().toISOString(),
        },
    };

    try {
        await dynamoDb.put(params).promise();
        console.log("User profile saved successfully.");
        return { statusCode: 200, body: JSON.stringify({ message: 'User profile saved successfully' }) };
    } catch (error) {
        console.error("Error saving user profile:", error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Could not save user profile' }) };
    }
};

