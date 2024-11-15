// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-300 to-coral-300 flex flex-col">
      {/* Navigation Bar */}
      <nav className="navbar fixed top-0 w-full bg-white bg-opacity-90 shadow-md p-4 flex justify-between items-center z-50">
        <div className="logo text-2xl font-bold text-teal-700">Brain Safari</div>
        <div className="nav-links flex space-x-4">
          <Link to="/courses" className="text-gray-700 hover:text-coral-500 transition">Courses</Link>
          <Link to="/mentors" className="text-gray-700 hover:text-coral-500 transition">Mentors</Link>
          <Link to="/community" className="text-gray-700 hover:text-coral-500 transition">Community</Link>
          <Link to="/profile" className="text-gray-700 hover:text-coral-500 transition">Profile</Link>
          <Link to="/login" className="text-teal-500 hover:text-teal-600 mx-2 transition">Login</Link>
          <Link to="/signup" className="text-coral-500 hover:text-coral-600 mx-2 transition">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 to-coral-400">
        <div className="hero-content text-center text-white max-w-3xl p-4">
          <h1 className="text-5xl font-bold mb-4">Empowering Your Learning Journey</h1>
          <p className="text-xl mb-6">
            Discover courses tailored to your growth and unlock your full potential with our innovative learning platform.
          </p>
          <div className="space-x-4">
            <Link to="/get-started" className="btn-primary text-white bg-coral-500 hover:bg-coral-600 py-2 px-6 rounded-full transition inline-block">Get Started</Link>
            <Link to="/learn-more" className="btn-secondary border-2 border-white text-white py-2 px-6 rounded-full transition inline-block hover:bg-white hover:text-coral-500">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses bg-white py-12 px-4 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="course-card bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2">
          <div className="course-content p-6">
            <h3 className="text-teal-700 font-bold text-lg mb-2">The Art of Philosophy</h3>
            <p className="text-gray-600 mb-4">Explore the fundamental questions of existence, knowledge, and ethics.</p>
            <div className="progress-bar bg-gray-200 h-2 rounded-lg overflow-hidden">
              <div className="progress bg-coral-500 h-full w-0 transition-all duration-500" style={{ width: '75%' }}></div>
            </div>
            <Link to="/courses/philosophy" className="btn mt-4 bg-coral-500 text-white px-4 py-2 rounded-full inline-block hover:bg-teal-500 transition">Learn More</Link>
          </div>
        </div>

        <div className="course-card bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2">
          <div className="course-content p-6">
            <h3 className="text-teal-700 font-bold text-lg mb-2">Modern Mathematics</h3>
            <p className="text-gray-600 mb-4">Master the language of the universe through advanced mathematical concepts.</p>
            <div className="progress-bar bg-gray-200 h-2 rounded-lg overflow-hidden">
              <div className="progress bg-coral-500 h-full w-0 transition-all duration-500" style={{ width: '50%' }}></div>
            </div>
            <Link to="/courses/mathematics" className="btn mt-4 bg-coral-500 text-white px-4 py-2 rounded-full inline-block hover:bg-teal-500 transition">Learn More</Link>
          </div>
        </div>

        <div className="course-card bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2">
          <div className="course-content p-6">
            <h3 className="text-teal-700 font-bold text-lg mb-2">Creative Writing</h3>
            <p className="text-gray-600 mb-4">Develop your narrative voice and craft compelling stories.</p>
            <div className="progress-bar bg-gray-200 h-2 rounded-lg overflow-hidden">
              <div className="progress bg-coral-500 h-full w-0 transition-all duration-500" style={{ width: '90%' }}></div>
            </div>
            <Link to="/courses/writing" className="btn mt-4 bg-coral-500 text-white px-4 py-2 rounded-full inline-block hover:bg-teal-500 transition">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Features/Courses Section */}
      <section className="features p-8 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-white">
        <div className="feature-card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2">
          <div className="feature-icon text-teal-500 mb-4">
            <i className="fas fa-laptop-code text-3xl"></i>
          </div>
          <h3 className="text-coral-500 font-bold mb-2">Interactive Learning</h3>
          <p>Engage with dynamic content and real-world projects to enhance your understanding.</p>
        </div>
        <div className="feature-card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2">
          <div className="feature-icon text-teal-500 mb-4">
            <i className="fas fa-users text-3xl"></i>
          </div>
          <h3 className="text-coral-500 font-bold mb-2">Expert Instructors</h3>
          <p>Learn from industry professionals with years of practical experience.</p>
        </div>
        <div className="feature-card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2">
          <div className="feature-icon text-teal-500 mb-4">
            <i className="fas fa-certificate text-3xl"></i>
          </div>
          <h3 className="text-coral-500 font-bold mb-2">Certified Courses</h3>
          <p>Earn recognized certificates upon completion of our comprehensive courses.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-teal text-white py-8">
        <div className="footer-grid mx-auto max-w-5xl px-4">
          <div className="footer-section">
            <h4 className="text-coral-500 mb-2">About Us</h4>
            <p>EduPlatform is dedicated to making quality education accessible to everyone, everywhere. Join us in our mission to transform lives through learning.</p>
          </div>
          <div className="footer-section">
            <h4 className="text-coral-500 mb-2">Quick Links</h4>
            <ul>
              <li><Link to="/about" className="text-white hover:text-coral-500 transition">About Us</Link></li>
              <li><Link to="/careers" className="text-white hover:text-coral-500 transition">Careers</Link></li>
              <li><Link to="/blog" className="text-white hover:text-coral-500 transition">Blog</Link></li>
              <li><Link to="/support" className="text-white hover:text-coral-500 transition">Support</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="text-coral-500 mb-2">Contact</h4>
            <ul>
              <li>Email: contact@eduplatform.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Learning Street</li>
              <li>City, State 12345</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>&copy; 2024 EduPlatform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
