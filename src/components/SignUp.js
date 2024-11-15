import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Learner',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (success || error) {
      setSuccess('');
      setError('');
    }
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('https://brain-safari-backend.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      if (response.ok) {
        setSuccess('User signed up successfully!');
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'Learner',
        });
        navigate('/login');
      } else if (response.status === 400) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to sign up. Please try again.');
      } else {
        setError('Failed to sign up. Please try again.');
      }
    } catch (error) {
      setError('Failed to sign up due to a network error. Please try again.');
      console.error('Error signing up:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-300 to-coral-300 flex justify-center items-center">
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-teal-700 mb-4">Sign Up</h2>
        <div className="input-group mb-4">
          <label htmlFor="username" className="block text-teal-700">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="input-group mb-4">
          <label htmlFor="email" className="block text-teal-700">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="input-group mb-4">
          <label htmlFor="password" className="block text-teal-700">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="input-group mb-6">
          <label htmlFor="confirmPassword" className="block text-teal-700">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <button type="submit"  className="w-full py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && <p className="text-green-500 text-center mt-4">{success}</p>}
      </form>
    </div>
  );
};

export default SignUp;