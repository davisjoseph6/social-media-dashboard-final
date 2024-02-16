// ChatbotService/handler.js
module.exports.chatbotInteraction = async (event) => {
    const userMessage = JSON.parse(event.body).message;

    // Implement your chatbot logic here
    // For simplicity, we're sending a static response
    const botResponse = "Hello! How can I assist you today?";

    return {
        statusCode: 200,
        body: JSON.stringify({ message: botResponse }),
    };
};

