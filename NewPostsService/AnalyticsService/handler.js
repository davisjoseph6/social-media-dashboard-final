// AnalyticsService/handler.js
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { ANALYTICS_TABLE, SUMMARY_TABLE } = process.env;

console.log('ANALYTICS_TABLE:', ANALYTICS_TABLE);
console.log('SUMMARY_TABLE:', SUMMARY_TABLE);

// Fetch all analytics data
module.exports.fetchAllAnalytics = async () => {
    const params = {
        TableName: ANALYTICS_TABLE,
    };

    try {
        const data = await dynamoDb.scan(params).promise();
        console.log('Retrieved all analytics data:', data);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Allows requests from any origin
                "Access-Control-Allow-Credentials": true, // For credentials support
                "Access-Control-Allow-Headers": "Content-Type", // Specify allowed headers
                "Access-Control-Allow-Methods": "OPTIONS,GET", // Allowed request methods
            },
            body: JSON.stringify(data.Items),
        };
    } catch (error) {
        console.error('Error fetching all analytics:', error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ error: 'Could not fetch all analytics', details: error.toString() }),
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
    // Placeholder for summarization logic
    const summary = {
        totalEvents: 100, // Example summary data
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

