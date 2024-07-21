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
    } catch (error) {
        console.error("Error saving user profile:", error);
        // It's crucial not to throw errors or return error status codes here.
        // Cognito expects a successful execution or modifications to the event object.
    }

    // Return the unmodified event to Cognito
    return event;
};

