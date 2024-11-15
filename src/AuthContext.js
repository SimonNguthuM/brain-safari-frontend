// src/AuthContext.js
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success"); // "success" or "error"
  const navigate = useNavigate();

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
  };

  const handleLogin = async (data) => {
    try {
      const response = await fetch("https://brain-safari-backend.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        showMessage("Login successful!");
        navigate("/dashboard");
      } else {
        throw new Error(res.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      showMessage(err.message, "error");
    }
  };

  const handleSignUp = async (data) => {
    try {
      const { name, email, phone, address, password } = data;
      const response = await fetch("https://brain-safari-backend.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          password,
          role: "Learner",
        }), // Default role set to "Learner"
      });
      const res = await response.json();
      if (res.farmer) {
        setUser(res.farmer);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        localStorage.setItem("user", JSON.stringify(res.farmer));
        showMessage("Sign up successful!");
        navigate("/dashboard");
      } else {
        throw new Error(res.message || "Sign up failed");
      }
    } catch (err) {
      console.error(err);
      showMessage(err.message, "error");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("user");
    navigate("/");
    showMessage("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        handleLogin,
        handleLogout,
        handleSignUp,
        message,
        messageType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
