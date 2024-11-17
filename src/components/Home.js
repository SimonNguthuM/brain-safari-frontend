import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r flex flex-col">
      {/* Navigation Bar */}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Empowering Your Learning Journey</h1>
          <p>Discover courses tailored to your growth and unlock your full potential with our innovative learning platform.</p>
          <div className="space-x-4">
            <Link to="/get-started" className="btn-primary">Get Started</Link>
            <Link to="/learn-more" className="btn-secondary">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses">
        <div className="course-card">
          <div className="course-content">
            <h3>The Art of Philosophy</h3>
            <p>Explore the fundamental questions of existence, knowledge, and ethics.</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: '75%' }}></div>
            </div>
            <Link to="/courses/philosophy" className="btn">Learn More</Link>
          </div>
        </div>

        <div className="course-card">
          <div className="course-content">
            <h3>Modern Mathematics</h3>
            <p>Master the language of the universe through advanced mathematical concepts.</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: '50%' }}></div>
            </div>
            <Link to="/courses/mathematics" className="btn">Learn More</Link>
          </div>
        </div>

        <div className="course-card">
          <div className="course-content">
            <h3>Creative Writing</h3>
            <p>Develop your narrative voice and craft compelling stories.</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: '90%' }}></div>
            </div>
            <Link to="/courses/writing" className="btn">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <div className="feature-icon"><i className="fas fa-laptop-code"></i></div>
          <h3>Interactive Learning</h3>
          <p>Engage with dynamic content and real-world projects to enhance your understanding.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><i className="fas fa-users"></i></div>
          <h3>Expert Instructors</h3>
          <p>Learn from industry professionals with years of practical experience.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><i className="fas fa-certificate"></i></div>
          <h3>Certified Courses</h3>
          <p>Earn recognized certificates upon completion of our comprehensive courses.</p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-grid">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>EduPlatform is dedicated to making quality education accessible to everyone, everywhere. Join us in our mission to transform lives through learning.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/support">Support</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li>Email: contact@eduplatform.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Learning Street</li>
              <li>City, State 12345</li>
            </ul>
          </div>
        </div>
        <div className="text-center">
          <p>&copy; 2024 EduPlatform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
