import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const ChatList = () => {
  const [chats, setChats] = useState([]);

  // Fetch existing chats from Firestore
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chatCollection = collection(db, "chats"); // 'chats' is the Firestore collection name
        const chatSnapshot = await getDocs(chatCollection);
        const chatList = chatSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChats(chatList);
      } catch (error) {
        console.error("Error fetching chats: ", error);
      }
    };

    fetchChats();
  }, []);

  // Add a new chat for demonstration purposes
  const addNewChat = async () => {
    try {
      const newChat = {
        name: "New User",
        lastMessage: "Hello there!",
        timestamp: new Date(),
      };

      // Add the new chat to Firestore
      const docRef = await addDoc(collection(db, "chats"), newChat);

      // Update the chats state with the new chat
      setChats((prevChats) => [
        ...prevChats,
        { id: docRef.id, ...newChat }, // Add the newly created chat
      ]);

      console.log("Chat added successfully!");
    } catch (error) {
      console.error("Error adding chat: ", error);
    }
  };

  return (
    <div>
      <h1>Chat List</h1>
      <button onClick={addNewChat}>Add New Chat</button>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>
            <h3>{chat.name}</h3>
            <p>{chat.lastMessage}</p>
            <small>
              {chat.timestamp instanceof Date
                ? chat.timestamp.toLocaleString()
                : chat.timestamp?.toDate().toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
