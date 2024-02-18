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
            userId: email,
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
        console.error('Registration error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not register user' }),
        };
    }
};

module.exports.userLogin = async (event) => {
    const { email, password } = JSON.parse(event.body);

    const params = {
        TableName: USERS_TABLE,
        Key: {
            userId: email,
        },
    };

    try {
        const { Item } = await dynamoDb.get(params).promise();
        if (Item) {
            const passwordIsValid = bcrypt.compareSync(password, Item.passwordHash);
            if (passwordIsValid) {
                return {
                    statusCode: 200,
                    body: JSON.stringify({ message: 'Login successful' }),
                };
            } else {
                return {
                    statusCode: 401,
                    body: JSON.stringify({ error: 'Authentication failed' }),
                };
            }
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'User not found' }),
            };
        }
    } catch (error) {
        console.error('Login error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not login user' }),
        };
    }
};

