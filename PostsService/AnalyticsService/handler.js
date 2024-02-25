// AnalyticsService/handler.js
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { ANALYTICS_TABLE } = process.env;

// Log the value of ANALYTICS_TABLE variable
console.log('ANALYTICS_TABLE:', ANALYTICS_TABLE);

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

// Function to insert analytics data
module.exports.insertAnalyticsData = async (userId, eventData) => {
    const params = {
        TableName: ANALYTICS_TABLE,
        Item: {
            userId: userId,
            date: new Date().toISOString(),
            eventData: eventData
        },
    };

    try {
        await dynamoDb.put(params).promise();
        console.log("Analytics data inserted successfully with params:", params);
        return true;
    } catch (error) {
        console.error("Error inserting analytics data with params:", params, "; Error:", error);
        return false;
    }
};

