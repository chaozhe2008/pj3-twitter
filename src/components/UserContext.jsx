import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
const UserUpdateContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function useUserUpdate() {
  return useContext(UserUpdateContext);
}

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await fetch("/api/users/isLoggedIn");
        const data = await response.json();
        if (data.username) {
          setCurrentUser(data.username);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoggedInStatus();
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      <UserUpdateContext.Provider value={setCurrentUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}
