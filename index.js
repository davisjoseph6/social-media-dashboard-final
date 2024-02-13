const awsServerlessExpress = require('aws-serverless-express');
const express = require('express');
const app = express();

// Define your Express app's routes as usual
app.get('/', (req, res) => {
    // Serve an HTML page
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Social Media Dashboard</title>
        </head>
        <body>
            <h1>Social Media Dashboard is running!</h1>
            <p>Welcome to the Social Media Dashboard.</p>
        </body>
        </html>
    `);
});

// Create a server using aws-serverless-express
const server = awsServerlessExpress.createServer(app);

// Export a handler function for AWS Lambda
exports.handler = (event, context) => {
    // Use awsServerlessExpress to proxy the incoming event to your Express app
    awsServerlessExpress.proxy(server, event, context);
};

