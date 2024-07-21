import React, { useState, useEffect } from 'react';
import MessageService from '../../services/MessageService';
import './messaging.css';

function Messaging() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversationId, setConversationId] = useState("user1_user2"); // Example conversation ID

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const fetchedMessages = await MessageService.fetchMessages(conversationId);
    setMessages(fetchedMessages);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const messageData = {
      conversationId,
      senderId: "user1", // Example sender ID
      receiverId: "user2", // Example receiver ID
      content: newMessage,
    };
    await MessageService.sendMessage(messageData);
    setNewMessage("");
    fetchMessages(); // Refresh the message list
  };

  return (
    <div className="messaging">
      <h1>Messaging</h1>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
      <div className="messages-list">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <p>{message.content}</p>
            <small>From: {message.senderId} To: {message.receiverId}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messaging;

