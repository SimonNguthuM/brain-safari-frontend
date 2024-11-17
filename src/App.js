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
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const response = await fetch("/authenticate", { method: "GET", credentials: "include" });
        if (response.ok) {
          const userData = await response.json();
          console.log("Authenticated user data:", userData);
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          console.error("Authentication failed:", await response.text());
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error authenticating user:", error);
        setIsAuthenticated(false);
      }
    };
  
    if (isAuthenticated === null) {
      authenticateUser();
    }
  }, [isAuthenticated, setUser]);
  

 const handleLogout = async () => {
  try {
    const response = await fetch("/logout", { method: "POST", credentials: "include" });
    if (response.ok) {
      console.log("Logged out successfully");
      setIsAuthenticated(false);
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
      {}
      <Navbar />
      {isAuthenticated === null ? (
        <div>Loading...</div>
      ) : (
        <Outlet
          context={{
            handleLogout,
            isAuthenticated,
            user,
          }}
        />
      )}
    </>
  );
};

export default App;
