const awsServerlessExpress = require('aws-serverless-express');
const express = require('express');
const app = express();

// Define your Express app's routes as usual
app.get('/', (req, res) => {
	res.send('Social Media Dashboard is running!');
});

// Create a server using aws-serverless-express
const server = awsServerlessExpress.createServer(app);

// Export a handler function for AWS Lambda
exports.handler = (event, context) => {
	// Use awsServerlessExpress to proxy the incoming event to your Express app
	awsServerlessExpress.proxy(server, event, context);
};
