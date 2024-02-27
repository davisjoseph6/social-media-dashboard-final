// handler.js
exports.preSignUpTrigger = async (event) => {
    console.log("Event: ", JSON.stringify(event, null, 2));
    // Implement any custom logic here

    // Example: Automatically verify email
    if (event.request.userAttributes.hasOwnProperty('email')) {
        event.response.autoVerifyEmail = true;
    }

    return event;
};

