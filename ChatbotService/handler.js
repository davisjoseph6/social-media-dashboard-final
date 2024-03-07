const AWS = require('aws-sdk');
const lexruntimev2 = new AWS.LexRuntimeV2({ region: 'eu-west-2' });
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-3' });

module.exports.chatbotInteraction = async (event) => {
    // Example of handling different invocation sources
    let userMessage = event.text || "How can I assist you?"; // Direct Lex invocation

    try {
        // Assuming direct Lex invocation, no need to call Lex API
        let responseMessage = "How can I assist you?";

        if (event.sessionState.intent.name === 'CheckAnalytics') {
            const scanParams = { TableName: "analyticsTable" };
            const data = await dynamoDb.scan(scanParams).promise();
            responseMessage = `There are ${data.Items.length} analytics records in total.`;
        }

        // Return a Lex-compatible response
        return {
            sessionState: {
                dialogAction: {
                    type: "Close"
                },
                intent: {
                    name: event.sessionState.intent.name,
                    state: "Fulfilled"
                }
            },
            messages: [{ contentType: "PlainText", content: responseMessage }],
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            sessionState: {
                dialogAction: {
                    type: "Close"
                },
                intent: {
                    name: event.sessionState.intent.name,
                    state: "Failed"
                }
            },
            messages: [{ contentType: "PlainText", content: "Error processing your request." }],
        };
    }
};

