import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import "./ChatWindow.css";

const ChatWindow = ({ currentUser }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const otherUser = currentUser === "Helen" ? "Sam" : "Helen";

  // Fetch messages in real-time
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("participants", "array-contains", currentUser),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages); // Update messages in real-time
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, [currentUser]);

  // Send a message
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = {
      sender: currentUser,
      receiver: otherUser,
      text: message.trim(),
      timestamp: new Date(),
      participants: [currentUser, otherUser],
    };

    try {
      await addDoc(collection(db, "messages"), newMessage);
      setMessage("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">Chat with {otherUser}</div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`chat-message ${
              msg.sender === currentUser ? "sent" : "received"
            }`}
          >
            {/* Avatar */}
            <img
              src={
                msg.sender === "Helen"
                  ? "/avatars/yier.png" // Path to Helen's avatar
                  : "/avatars/bubu.png" // Path to Sam's avatar
              }
              alt={`${msg.sender}'s avatar`}
              className="avatar"
            />
            {/* Chat Bubble */}
            <div className="chat-bubble">
              <strong>{msg.sender}</strong>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
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
