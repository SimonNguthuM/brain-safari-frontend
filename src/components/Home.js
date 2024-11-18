// src/components/Home.js

import React from "react";
import { Link } from "react-router-dom";
import { FaLaptopCode, FaUsers, FaCertificate } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Profile from "./Profile";
import { useUser } from "../App";

function Home() {
  const { user } = useUser();
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-light to-coral-light flex flex-col">
      {!user ? (
        <>
          {/* Navigation Bar */}
          <nav className="fixed top-0 w-full bg-white bg-opacity-90 shadow-md p-4 flex justify-between items-center z-50 transition-transform duration-500 hover:shadow-lg">
            <img
              src="/brainsafari.png"
              alt="BrainSafari Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="text-2xl font-bold text-teal-dark hover:text-coral transition-transform transform hover:scale-105 cursor-pointer">
              Brain Safari
            </div>
            <div className="flex space-x-4">
              {["Courses", "Mentors", "Community", "Profile"].map((link) => (
                <Link
                  key={link}
                  to={`/${link.toLowerCase()}`}
                  className="text-gray-700 hover:text-coral transition duration-300"
                >
                  {link}
                </Link>
              ))}
              <Link
                to="/login"
                className="text-teal hover:text-teal-dark mx-2 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-coral hover:text-coral-dark mx-2 transition"
              >
                Sign Up
              </Link>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="hero min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-light to-coral">
            <Carousel
              autoPlay
              interval={8000}
              infiniteLoop
              showStatus={false}
              showThumbs={false}
              useKeyboardArrows
              transitionTime={500}
              stopOnHover={false}
              dynamicHeight
            >
              <div>
                <img src="/image1.jpg" alt="Carousel" />
                <p className="legend">Image 1 Description</p>
              </div>
              <div>
                <img src="/image2.jpg" alt="learning" />
                <p className="legend">Image 2 Description</p>
              </div>
              <div>
                <video controls>
                  <source src="/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="legend">Doing IT right</p>
              </div>
              <div>
                <img src="/alwaysbelearning.webp" alt="Carousel GIF" />
                <p className="legend">Journey to knowledge</p>
              </div>
              <div>
                <img src="/BrainSafari.png" alt="akili" />
                <p className="legend">Image 2 Description</p>
              </div>
            </Carousel>
          </section>

          {/* Courses Section */}
          <section className="bg-white py-12 px-4 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "The Art of Philosophy",
                description:
                  "Explore the fundamental questions of existence, knowledge, and ethics.",
                progress: "75%",
                link: "/courses/philosophy",
                image: "/philosophy-image.jpg",
              },
              {
                title: "Modern Mathematics",
                description:
                  "Master the language of the universe through advanced mathematical concepts.",
                progress: "50%",
                link: "/courses/mathematics",
                image: "/mathematics-image.jpg",
              },
              {
                title: "Creative Writing",
                description:
                  "Develop your narrative voice and craft compelling stories.",
                progress: "90%",
                link: "/courses/writing",
                image: "/writing-image.jpeg",
              },
            ].map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 hover:scale-105"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-teal-dark font-bold text-lg mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="bg-gray-200 h-2 rounded-lg overflow-hidden mb-4">
                    <div
                      className="bg-coral h-full transition-all duration-700"
                      style={{ width: course.progress }}
                    ></div>
                  </div>
                  <Link
                    to={course.link}
                    className="bg-coral hover:bg-teal text-white px-4 py-2 rounded-full inline-block transition transform hover:-translate-y-1"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </section>

          {/* Features Section */}
          <section className="p-8 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-white">
            {[
              {
                icon: <FaLaptopCode className="text-teal mb-4 text-3xl" />,
                title: "Interactive Learning",
                description:
                  "Engage with dynamic content and real-world projects to enhance your understanding.",
                gif: "/interactive-learning.webp",
              },
              {
                icon: <FaUsers className="text-teal mb-4 text-3xl" />,
                title: "Expert Instructors",
                description:
                  "Learn from industry professionals with years of practical experience.",
                video: "/expert-instructors.mp4",
              },
              {
                icon: <FaCertificate className="text-teal mb-4 text-3xl" />,
                title: "Certified Courses",
                description:
                  "Earn recognized certificates upon completion of our comprehensive courses.",
                gif: "/certified-courses.webp",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 hover:scale-105"
              >
                {feature.gif && (
                  <img
                    src={feature.gif}
                    alt={feature.title}
                    className="w-full h-48 object-cover mb-4"
                  />
                )}
                {feature.video && (
                  <video controls className="w-full h-48 object-cover mb-4">
                    <source src={feature.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                {feature.icon}
                <h3 className="text-coral font-bold mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </section>

          {/* Footer */}
          <footer className="bg-teal-dark text-white py-8">
            <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-coral mb-2">About Us</h4>
                <img
                  src="/brainsafari.png"
                  alt="BrainSafari Logo"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <p>
                  BrainSafari is dedicated to making quality education accessible
                  to everyone, everywhere. Join us in our mission to transform
                  lives through learning.
                </p>
                <ul className="list-none flex justify-right items-right space-x-2 mt-4">
                  <li>
                    <a className="text-white px-2" href="#!">
                      <i className="fab fa-facebook-square"></i>
                    </a>
                  </li>
                  <li>
                    <a className="text-white px-2" href="#!">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a className="text-white px-2" href="#!">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-coral mb-2">Quick Links</h4>
                <ul>
                  <li>
                    <Link to="/about" className="hover:text-coral transition">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/careers" className="hover:text-coral transition">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="hover:text-coral transition">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/support" className="hover:text-coral transition">
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-coral mb-2">Contact</h4>
                <ul>
                  <li>
                    <i className="fas fa-envelope mr-2"></i>Email:
                    brainsafari@eduplatform.com
                  </li>
                  <li>
                    <i className="fas fa-phone mr-2"></i>Phone: (555) 123-4567
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt mr-2"></i>Address: 123
                    Learning Street
                  </li>
                  <li>
                    <i className="fas fa-city mr-2"></i>City, State 12345
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-8">
              <p>&copy; 2024 BrainSafari. All rights reserved.</p>
            </div>
          </footer>
        </>
      ) : (
        // Profile view for logged-in users
        <Profile />
      )}
    </div>
  );
}

export default Home;
