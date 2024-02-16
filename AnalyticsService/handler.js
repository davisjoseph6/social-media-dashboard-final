// AnalyticsService/handler.js
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { ANALYTICS_TABLE } = process.env;

module.exports.fetchAnalytics = async (event) => {
    const userId = event.pathParameters.userId;

    const params = {
        TableName: ANALYTICS_TABLE,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": userId,
        },
    };

    try {
        const data = await dynamoDb.query(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not fetch analytics' }),
        };
    }
};

