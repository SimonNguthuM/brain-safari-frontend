import React from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import { useUser } from "../App";

function Home() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-r flex flex-col">
      {!user ? (
        // Basic view for non-logged-in users
        <>
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

          {/* Other sections remain unchanged */}
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
        </>
      ) : (
        // Profile view for logged-in users
        <Profile />
      )}
    </div>
  );
}

export default Home;
