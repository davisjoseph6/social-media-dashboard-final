// handler.js
exports.preSignUpTrigger = async (event) => {
    console.log("Event: ", JSON.stringify(event, null, 2));
    // Implement any custom logic here that doesn't involve auto-verifying email or phone

    // For example, you can implement custom validation logic here
    // But do not automatically verify email or phone since the user pool does not auto-confirm users

    return event;
};

