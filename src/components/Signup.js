// src/components/Signup.js
import React, { useState } from 'react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your session cookie logic here, e.g., calling the backend API
    console.log('Signup submitted:', { username, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-coral-400 to-teal-400">
      <div className="p-6 max-w-sm w-full bg-white bg-opacity-80 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-coral-700 mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-coral-700">Username:</label>
            <input
              type="text"
              className="w-full p-2 border border-coral-300 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-coral-700">Email:</label>
            <input
              type="email"
              className="w-full p-2 border border-coral-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-coral-700">Password:</label>
            <input
              type="password"
              className="w-full p-2 border border-coral-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-coral-500 hover:bg-coral-600 text-white py-2 px-4 rounded transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
