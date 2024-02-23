// AnalyticsService/handler.js
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { ANALYTICS_TABLE } = process.env;

module.exports.fetchAnalytics = async (event) => {
    const userId = event.pathParameters.userId;
    
    // Log the userId to verify it's being extracted correctly
    console.log('userId:', userId);

    const params = {
        TableName: ANALYTICS_TABLE,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": userId,
        },
    };

    try {
        // Log the DynamoDB query params to verify they're constructed correctly
        console.log('DynamoDB query params:', params);

        const data = await dynamoDb.query(params).promise();

        // Log the retrieved data to verify it
        console.log('Retrieved data:', data);

        return {
            statusCode: 200,
            body: JSON.stringify(data.Items),
        };
    } catch (error) {
        // Log any errors that occur during data retrieval
        console.error('Error fetching analytics:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not fetch analytics' }),
        };
    }
};

