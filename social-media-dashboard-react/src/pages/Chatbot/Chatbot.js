import React, { useState } from 'react';
import ChatbotService from '../../services/ChatbotService';
import './chatbot.css';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        const userMessage = userInput;
        setMessages([...messages, { type: 'user', text: userMessage }]);
        setUserInput('');

        try {
            const response = await ChatbotService.sendMessageToBot(userMessage);
            setMessages([...messages, { type: 'user', text: userMessage }, { type: 'bot', text: response.messages[0].content }]);
        } catch (error) {
            console.error('Error sending message to bot:', error);
            setMessages([...messages, { type: 'user', text: userMessage }, { type: 'bot', text: 'Sorry, I am having trouble understanding you.' }]);
        }
    };

    return (
        <div className="chatbot">
            <h1>Chatbot</h1>
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className={message.type}>
                        {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Chatbot;

