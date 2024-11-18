import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../App";

function Navbar({ handleLogout }) {
  const { user } = useUser(); // Use user context to get the current user


  // Get the name of the current route (use last part of pathname as page name)

  return (
    <nav className="navbar fixed top-0 w-full bg-white bg-opacity-90 shadow-md p-4 flex justify-between items-center z-50">
      <div className="logo">
        <Link to="/">Brain Safari</Link>
      </div>
      <div className="nav-links ml-auto flex gap-4">
        {user ? (
          <>
            <span>{user.username}</span>
            <button onClick={handleLogout} className="text-red-500">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-teal-500">Login</Link>
            <Link to="/signup" className="text-coral-500">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
