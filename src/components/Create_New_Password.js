import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import Navbar from "./Navbar";

const CreateNewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic password validation
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    // Reset error if validation passes
    setPasswordError("");

    // TODO: Implement password reset logic
    console.log("Password reset submitted");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header would be imported or implemented here */}
      <Navbar />
      <section className="container mx-auto flex flex-col justify-center items-center flex-grow px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-4">
              <h1 className="text-2xl font-bold mb-1">Create New Password</h1>
              <p className="text-gray-600">
                Choose a new password for your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Enter New Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="**************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="**************"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {passwordError && (
                <div className="text-red-500 text-sm mb-2">{passwordError}</div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2 transition duration-300"
                >
                  <span>Save New Password</span>
                  <CheckCircle className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateNewPassword;
