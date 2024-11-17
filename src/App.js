import React, { useState, useEffect, createContext, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

const App = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const response = await fetch("https://brain-safari-backend.onrender.com/authenticate", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          console.log("Authenticated user data:", userData);
          setUser(userData);
        } else {
          console.error("Authentication failed:", await response.text());
          setUser(null);
        }
      } catch (error) {
        console.error("Error authenticating user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (user === null) {
      authenticateUser();
    } else {
      setIsLoading(false);
    }
  }, [user, setUser]);

  const handleLogout = async () => {
    try {
      console.log("Sending logout request...");
      const response = await fetch("https://brain-safari-backend.onrender.com/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        console.log("Logged out successfully");
        setUser(null);
        navigate("/");
      } else {
        console.error("Error logging out:", await response.text());
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <Navbar handleLogout={handleLogout} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Outlet context={{ handleLogout, user, isLoading }} />
      )}
    </>
  );
};

export default App;
