const AWS = require('aws-sdk');

exports.handler = async (event) => {
    console.log('Event: ', JSON.stringify(event, null, 2));
    
    if (event.triggerSource === "CustomMessage_SignUp") {
        // Customize your email subject and message
        event.response.emailSubject = "Welcome to Our Awesome Service!";
        
        const codeParameter = event.request.codeParameter;
        const userName = event.userName; // Corrected userName access
        const email = event.request.userAttributes.email; // Direct access
        
        // Ensure email and userName are not undefined
        if (email && userName) {
            // Customize your email message
            event.response.emailMessage = `Welcome ${userName}! Use the following code to complete your registration: ${codeParameter}`;
        } else {
            console.log("Email or userName is undefined.");
            // Handle the case where email or userName might not be as expected
        }
    }
    
    // Return to Amazon Cognito
    return event;
};

