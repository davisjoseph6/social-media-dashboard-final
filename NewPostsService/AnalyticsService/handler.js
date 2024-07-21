// AnalyticsService/handler.js
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const quickSight = new AWS.QuickSight({ apiVersion: '2018-04-01' });
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
    const summary = {
        totalEvents: 100, // Example summary data
    };

    const params = {
        TableName: SUMMARY_TABLE,
        Item: {
            summaryId: 'global',
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

// Fetch QuickSight embed URL
module.exports.fetchQuickSightEmbedUrl = async () => {
    const params = {
        AwsAccountId: "637423166046",
        DashboardId: "fce31f6e-78d3-441b-bf74-f290fd3901af",
        IdentityType: "IAM",
        SessionLifetimeInMinutes: 100,
        UndoRedoDisabled: false,
        ResetDisabled: false,
        UserArn: "arn:aws:quicksight:eu-west-3:637423166046:user/default/davis", 
    };

    try {
        const data = await quickSight.getDashboardEmbedUrl(params).promise();
        console.log('QuickSight Embed URL:', data.EmbedUrl);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Update as per your CORS policy
            },
            body: JSON.stringify({ embedUrl: data.EmbedUrl }),
        };
    } catch (error) {
        console.error('Error fetching QuickSight embed URL:', error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Update as per your CORS policy
            },
            body: JSON.stringify({ error: 'Could not fetch QuickSight embed URL', details: error.toString() }),
        };
    }
};

