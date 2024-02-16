// AuthService/handler.js
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const bcrypt = require('bcryptjs');
const { USERS_TABLE } = process.env;

module.exports.userRegistration = async (event) => {
    const { username, email, password } = JSON.parse(event.body);
    const hashedPassword = bcrypt.hashSync(password, 8);

    const params = {
        TableName: USERS_TABLE,
        Item: {
            userId: email, // Consider using a UUID
            username,
            email,
            passwordHash: hashedPassword,
        },
    };

    try {
        await dynamoDb.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User registered successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not register user' }),
        };
    }
};

