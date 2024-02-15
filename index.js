const awsServerlessExpress = require('aws-serverless-express');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
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

const server = awsServerlessExpress.createServer(app);
exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);

