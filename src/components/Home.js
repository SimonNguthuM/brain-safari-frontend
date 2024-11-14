import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-300 to-coral-300 flex flex-col">
      <nav className="flex justify-between items-center p-4 bg-white bg-opacity-70 shadow-md">
        <div className="text-2xl font-bold text-teal-700">MyApp Logo</div>
        <div>
          <Link
            to="/login"
            className="text-teal-500 hover:text-teal-600 mx-2 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-coral-500 hover:text-coral-600 mx-2 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Welcome to MyApp
          </h1>
          <p className="text-lg text-white mb-8">
            Start your journey with us.
          </p>
        </div>
      </main>
      <footer className="p-4 bg-white bg-opacity-70 text-center">
        <p className="text-sm text-teal-700">© 2024 MyApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

