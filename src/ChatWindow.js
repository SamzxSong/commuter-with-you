import React, { useState, useEffect, useRef } from "react";
import "./ChatWindow.css";

const ChatWindow = ({ currentUser }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const otherUser = currentUser === "Helen" ? "Sam" : "Helen";

  // Fetch messages from the proxy server
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "https://your-proxy-server.com/getMessages",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await response.json();
        const filteredMessages = data.filter((msg) =>
          msg.participants.includes(currentUser)
        );
        setMessages(filteredMessages);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages. Please try again.");
        setLoading(false);
      }
    };

    fetchMessages();
  }, [currentUser]);

  // Scroll to the latest message
  useEffect(() => {
    if (!loading) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  // Send a message via the proxy server
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = {
      sender: currentUser,
      receiver: otherUser,
      text: message.trim(),
      participants: [currentUser, otherUser],
    };

    try {
      const response = await fetch(
        "https://your-proxy-server.com/sendMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessage),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setMessage("");
      // Update messages immediately after sending
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">Chat with {otherUser}</div>
      <div className="chat-messages">
        {error ? (
          <div className="error-message">{error}</div>
        ) : loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.sender === currentUser ? "sent" : "received"
              }`}
            >
              {/* Avatar */}
              <img
                src={
                  msg.sender === "Helen"
                    ? "/commuter-with-you/avatars/yier.png" // Path to Helen's avatar
                    : "/commuter-with-you/avatars/bubu.png" // Path to Sam's avatar
                }
                alt={`${msg.sender}'s avatar`}
                className="avatar"
              />
              {/* Chat Bubble */}
              <div className="chat-bubble">
                <strong>{msg.sender}</strong>
                <p>{msg.text}</p>
                <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef}></div> {/* Scroll anchor */}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
