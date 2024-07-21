const AWS = require('aws-sdk');

exports.handler = async (event) => {
    console.log('Event: ', JSON.stringify(event, null, 2));
    
    if (event.triggerSource === "CustomMessage_SignUp") {
        // Set the email subject
        event.response.emailSubject = "Welcome to Our Social-Media-Service!";
        
        // Extract the confirmation code and user's name
        const codeParameter = event.request.codeParameter;
        const userName = event.userName;
        const email = event.request.userAttributes.email;
        
        // URL for the Update Profile page
        const updateProfileLink = "https://jk7i4ijosi.execute-api.eu-west-3.amazonaws.com/dev/user/profile";
        
        // Ensure the email and userName variables are defined
        if (email && userName) {
            // Customize the email message
            event.response.emailMessage = `Welcome ${userName}! Use the following code to complete your registration: ${codeParameter}. To update your profile, please visit: <a href="${updateProfileLink}">Update Profile</a>.`;
        } else {
            console.log("Email or userName is undefined.");
            // Optional: Handle the case where the email or userName might not be as expected
        }
    }
    
    // Return to Amazon Cognito
    return event;
};

