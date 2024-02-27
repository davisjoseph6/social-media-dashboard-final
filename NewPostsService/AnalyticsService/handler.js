// AnalyticsService/handler.js
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { ANALYTICS_TABLE, SUMMARY_TABLE } = process.env;

console.log('ANALYTICS_TABLE:', ANALYTICS_TABLE);
console.log('SUMMARY_TABLE:', SUMMARY_TABLE);

// Fetch analytics data for a given user
module.exports.fetchAnalytics = async (event) => {
    const userId = event.pathParameters.userId;
    console.log('userId:', userId);

    const params = {
        TableName: ANALYTICS_TABLE,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": userId,
        },
    };

    try {
        console.log('DynamoDB query params:', params);
        const data = await dynamoDb.query(params).promise();
        console.log('Retrieved data:', data);

        return {
            statusCode: 200,
            body: JSON.stringify(data.Items),
        };
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not fetch analytics', details: error.toString() }),
        };
    }
};

// Insert analytics data for various user actions
module.exports.insertAnalyticsData = async (userId, eventData) => {
    const params = {
        TableName: ANALYTICS_TABLE,
        Item: {
            userId: userId,
            date: new Date().toISOString(),
            eventData: eventData,
        },
    };

    try {
        await dynamoDb.put(params).promise();
        console.log("Analytics data inserted successfully with params:", params);
    } catch (error) {
        console.error("Error inserting analytics data with params:", params, "; Error:", error);
    }
};

// Summarize and store analytics data
module.exports.summarizeAnalytics = async () => {
    // Example summarization logic here
    const summary = {
        totalEvents: 100, // Example summary data
        // Add your summarization logic
    };

    const params = {
        TableName: SUMMARY_TABLE,
        Item: {
            summaryId: 'global', // Use a fixed ID for a global summary or a unique ID for specific summaries
            summaryDate: new Date().toISOString(),
            data: summary,
        },
    };

    try {
        await dynamoDb.put(params).promise();
        console.log("Summary data inserted successfully with params:", params);
    } catch (error) {
        console.error("Error inserting summary data with params:", params, "; Error:", error);
    }
};

