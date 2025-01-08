import React, { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  // Check localStorage for a logged-in user on page load
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  // Handle login
  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", user); // Save the user to localStorage
  };

  // Handle logout
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser"); // Clear the user from localStorage
  };

  return (
    <div>
      {currentUser ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <ChatWindow currentUser={currentUser} />
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <button onClick={() => handleLogin("Helen")}>Login as Helen</button>
          <button onClick={() => handleLogin("Sam")}>Login as Sam</button>
        </div>
      )}
    </div>
  );
};

export default App;
