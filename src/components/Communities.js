import React, { useState } from "react";
import { Link } from "lucide-react";
import Navbar from "Navbar ";
import DiscussionQuestions from "./DiscussionQuestion";

const courseId = 1;

function Community2() {
  const [noteShow, setNoteShow] = useState(false);

  const [activeTab, setActiveTab] = useState("lectures");

  const [addQuestionShow, setAddQuestionShow] = useState(false);
  const handleQuestionClose = () => setAddQuestionShow(false);

  const TEST_USER_ID = 1;
  const TEST_RESOURCE_ID = 1;

  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleMessageChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveQuestion = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://127.0.0.1:5555/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          user_id: TEST_USER_ID,
          content: formData.message,
          resource_id: TEST_RESOURCE_ID,
        }),
      });
      console.log({
        title: formData.title,
        user_id: TEST_USER_ID,
        content: formData.message,
        resource_id: TEST_RESOURCE_ID,
      });
      const data = await response.json();
      console.log("Success:", data);
      if (!response.ok) {
        throw new Error("Failed to submit question");
      }
      handleQuestionClose();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <BaseHeader />
      <section className="pt-5 pb-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row mt-0 md:mt-4">
            <div className="col-span-12 lg:col-span-9 md:col-span-8">
              <section className="mt-4">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-12">
                    {/* Main content START */}
                    <div className="col-span-12">
                      <div className="card bg-white shadow-md rounded-lg p-0 -mt-5">
                        {/* Tabs START */}
                        {/* Tabs Navigation */}
                        <div className="border-b px-4 pt-3 pb-0">
                          <ul className="flex space-x-4 border-b">
                            <li className="py-2">
                              <button
                                className={`text-gray-600 hover:text-blue-600 font-semibold pb-2 border-b-2 ${
                                  activeTab === "lectures"
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent"
                                }`}
                                onClick={() => handleTabChange("lectures")}
                              >
                                Course Lectures
                              </button>
                            </li>
                            <li className="py-2">
                              <button
                                className={`text-gray-600 hover:text-blue-600 font-semibold pb-2 border-b-2 ${
                                  activeTab === "notes"
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent"
                                }`}
                                onClick={() => handleTabChange("notes")}
                              >
                                Notes
                              </button>
                            </li>
                            <li className="py-2">
                              <button
                                className={`text-gray-600 hover:text-blue-600 font-semibold pb-2 border-b-2 ${
                                  activeTab === "discussion"
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent"
                                }`}
                                onClick={() => handleTabChange("discussion")}
                              >
                                Discussion
                              </button>
                            </li>
                            <li className="py-2">
                              <button
                                className={`text-gray-600 hover:text-blue-600 font-semibold pb-2 border-b-2 ${
                                  activeTab === "review"
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent"
                                }`}
                                onClick={() => handleTabChange("review")}
                              >
                                Leave a Review
                              </button>
                            </li>
                          </ul>
                        </div>

                        {/* Tab Content */}
                        <div className="p-4 sm:p-6">
                          {/* Lectures Tab */}
                          {activeTab === "lectures" && (
                            <div className="space-y-4">
                              <div className="mb-3">
                                <div
                                  className="bg-blue-500 text-white text-center py-2 rounded"
                                  style={{ width: `${25}%` }}
                                >
                                  25%
                                </div>
                              </div>
                              {/* Accordion START */}
                              <div className="accordion">
                                {/* First Accordion Item: Introduction of Digital Marketing */}
                                <div className="mb-3 border rounded">
                                  <h6 className="font-base" id="heading-1">
                                    <button
                                      className="w-full text-left p-3 bg-gray-100 hover:bg-gray-200 flex justify-between items-center rounded collapse-toggle"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapse-1"
                                      aria-expanded="true"
                                      aria-controls="collapse-1"
                                    >
                                      <span className="font-bold">
                                        Introduction of Digital Marketing
                                      </span>
                                      <span className="text-sm text-gray-600 ml-2">
                                        (3 Lectures)
                                      </span>
                                    </button>
                                  </h6>
                                  <div
                                    id="collapse-1"
                                    className="accordion-collapse collapse show"
                                    aria-labelledby="heading-1"
                                  >
                                    <div className="p-3">
                                      {/* Lecture 1 */}
                                      <div className="flex justify-between items-center py-2">
                                        <div className="flex items-center space-x-2">
                                          <Link
                                            href="#"
                                            className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                                          >
                                            <i className="fas fa-play" />
                                          </Link>
                                          <span className="truncate max-w-xs font-light">
                                            Introduction
                                          </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <p className="text-sm">3m 9s</p>
                                          <input
                                            type="checkbox"
                                            className="form-checkbox"
                                          />
                                        </div>
                                      </div>
                                      <hr className="my-2" />
                                      {/* Lecture 2 */}
                                      <div className="flex justify-between items-center py-2">
                                        <div className="flex items-center space-x-2">
                                          <Link
                                            href="#"
                                            className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                                          >
                                            <i className="fas fa-play" />
                                          </Link>
                                          <span className="truncate max-w-xs font-light">
                                            What is Digital Marketing
                                          </span>
                                        </div>
                                        <p className="text-sm truncate">
                                          15m 10s
                                        </p>
                                      </div>
                                      <hr className="my-2" />
                                      {/* Lecture 3 */}
                                      <div className="flex justify-between items-center py-2">
                                        <div className="flex items-center space-x-2">
                                          <Link
                                            href="#"
                                            className="bg-gray-300 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center"
                                          >
                                            <i className="fas fa-lock" />
                                          </Link>
                                          <span className="truncate max-w-xs font-light text-gray-400">
                                            Type of Digital Marketing
                                          </span>
                                        </div>
                                        <p className="text-sm">18m 10s</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Second Accordion Item: Customer Life Cycle */}
                                <div className="mb-3 border rounded">
                                  <h6 className="font-base" id="heading-2">
                                    <button
                                      className="w-full text-left p-3 bg-gray-100 hover:bg-gray-200 flex justify-between items-center rounded collapse-toggle"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapse-2"
                                      aria-expanded="false"
                                      aria-controls="collapse-2"
                                    >
                                      <span className="font-bold">
                                        Customer Life Cycle
                                      </span>
                                      <span className="text-sm text-gray-600 ml-2">
                                        (4 Lectures)
                                      </span>
                                    </button>
                                  </h6>
                                  <div
                                    id="collapse-2"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="heading-2"
                                  >
                                    <div className="p-3">
                                      {/* Lecture 1 */}
                                      <div className="flex justify-between items-center py-2">
                                        <div className="flex items-center space-x-2">
                                          <Link
                                            href="#"
                                            className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                                          >
                                            <i className="fas fa-play" />
                                          </Link>
                                          <span className="truncate max-w-xs font-light">
                                            What is Digital Marketing
                                          </span>
                                        </div>
                                        <p className="text-sm">11m 20s</p>
                                      </div>
                                      <hr className="my-2" />
                                      {/* Lecture 2 */}
                                      <div className="flex justify-between items-center py-2">
                                        <div className="flex items-center space-x-2">
                                          <Link
                                            href="#"
                                            className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                                          >
                                            <i className="fas fa-play" />
                                          </Link>
                                          <span className="truncate max-w-xs font-light">
                                            15 Tips for Writing Magnetic
                                            Headlines
                                          </span>
                                        </div>
                                        <p className="text-sm truncate">
                                          25m 20s
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Third Accordion Item: Additional Lectures */}
                                <div className="mb-3 border rounded">
                                  <h6 className="font-base" id="heading-3">
                                    <button
                                      className="w-full text-left p-3 bg-gray-100 hover:bg-gray-200 flex justify-between items-center rounded collapse-toggle"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapse-3"
                                      aria-expanded="false"
                                      aria-controls="collapse-3"
                                    >
                                      <span className="font-bold">
                                        Additional Lectures
                                      </span>
                                      <span className="text-sm text-gray-600 ml-2">
                                        (2 Lectures)
                                      </span>
                                    </button>
                                  </h6>
                                  <div
                                    id="collapse-3"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="heading-3"
                                  >
                                    <div className="p-3">
                                      {/* Lecture 1 */}
                                      <div className="flex justify-between items-center py-2">
                                        <div className="flex items-center space-x-2">
                                          <Link
                                            href="#"
                                            className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                                          >
                                            <i className="fas fa-play" />
                                          </Link>
                                          <span className="truncate max-w-xs font-light">
                                            How to Write Like Your Customers
                                            Talk
                                          </span>
                                        </div>
                                        <p className="text-sm">11m 30s</p>
                                      </div>
                                      <hr className="my-2" />
                                      {/* Lecture 2 */}
                                      <div className="flex justify-between items-center py-2">
                                        <div className="flex items-center space-x-2">
                                          <Link
                                            href="#"
                                            className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                                          >
                                            <i className="fas fa-play" />
                                          </Link>
                                          <span className="truncate max-w-xs font-light">
                                            How to Flip Features Into Benefits
                                          </span>
                                          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                                            <i className="fas fa-lock fa-fw mr-1" />
                                            Premium
                                          </span>
                                        </div>
                                        <p className="text-sm truncate w-16">
                                          35m 30s
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Notes Tab */}
                          {activeTab === "notes" && (
                            <div className="space-y-4">
                              <div className="border-b flex justify-between items-center pb-4">
                                <h4 className="text-lg font-semibold">
                                  All Notes
                                </h4>
                                <button
                                  type="button"
                                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2"
                                  onClick={() => setNoteShow(true)}
                                >
                                  <span>Add Note</span>
                                  <i className="fas fa-pen"></i>
                                </button>
                              </div>

                              {/* Notes Section */}
                              <div className="p-0 pt-3">
                                {/* Note Item */}
                                <div className="grid p-3">
                                  <div className="shadow-md rounded-lg p-4 m-3">
                                    <h5 className="text-lg font-semibold mb-2">
                                      What is Digital Marketing
                                    </h5>
                                    <p className="text-gray-600 mb-4">
                                      Arranging rapturous did believe him all
                                      had supported. Supposing so be resolving
                                      breakfast am or perfectly. It drew a hill
                                      from me. Valley by oh twenty direct me so.
                                      Departure defective arranging rapturous
                                      did believe him all had supported. Family
                                      months lasted simple set nature vulgar
                                      him. Picture for attempt joy excited ten
                                      carried manners talking how.
                                    </p>
                                    {/* Action Buttons */}
                                    <div className="flex space-x-3 flex-wrap">
                                      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center">
                                        <i className="bi bi-pencil-square mr-2" />{" "}
                                        Edit
                                      </button>
                                      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center">
                                        <i className="bi bi-trash mr-2" />{" "}
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <hr />
                              </div>
                            </div>
                          )}

                          {/* Discussion Tab */}
                          {activeTab === "discussion" && (
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-xl font-bold mb-4">
                                  Discussion
                                </h4>
                                <form className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                  <div className="md:col-span-9 relative">
                                    <input
                                      className="w-full pl-3 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      type="search"
                                      placeholder="Search"
                                    />
                                    <button
                                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-blue-500"
                                      type="submit"
                                    >
                                      <i className="fas fa-search" />
                                    </button>
                                  </div>
                                  <div className="md:col-span-3">
                                    <button
                                      type="button"
                                      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                                      onClick={() => setAddQuestionShow(true)}
                                    >
                                      Ask Question
                                    </button>
                                  </div>
                                </form>
                              </div>

                              {/* Discussion Questions Section */}
                              <DiscussionQuestions courseId={courseId} />
                            </div>
                          )}

                          {/* Review Tab */}
                          {activeTab === "review" && (
                            <div className="space-y-4">
                              <h4 className="text-xl font-bold">
                                Leave a Review
                              </h4>
                              <form className="space-y-4">
                                <div className="bg-gray-100 rounded">
                                  <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value={1}>★☆☆☆☆ (1/5)</option>
                                    <option value={2}>★★☆☆☆ (2/5)</option>
                                    <option value={3}>★★★☆☆ (3/5)</option>
                                    <option value={4}>★★★★☆ (4/5)</option>
                                    <option value={5}>★★★★★ (5/5)</option>
                                  </select>
                                </div>
                                <div className="bg-gray-100 rounded">
                                  <textarea
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your review"
                                    rows={3}
                                  ></textarea>
                                </div>
                                <button
                                  type="submit"
                                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                  Submit Review
                                </button>
                              </form>

                              {/* Existing Reviews Section */}
                              <div className="mt-6">
                                <h4 className="text-lg font-semibold">
                                  Existing Reviews
                                </h4>
                                <div className="space-y-3">
                                  {/* Review Item */}
                                  <div className="shadow rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                      <img
                                        src="https://geeksui.codescandy.com/geeks/assets/images/avatar/avatar-1.jpg"
                                        className="w-10 h-10 rounded-full object-cover mr-3"
                                        alt="avatar"
                                      />
                                      <div>
                                        <h6 className="font-semibold">
                                          John Doe
                                        </h6>
                                        <small className="text-gray-500">
                                          5 days ago
                                        </small>
                                      </div>
                                    </div>
                                    <div className="flex items-center mb-2">
                                      <span className="text-yellow-500">
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                      </span>
                                    </div>
                                    <p className="text-gray-700">
                                      This course was fantastic! I learned so
                                      much about digital marketing.
                                    </p>
                                  </div>

                                  {/* Review Item */}
                                  <div className="shadow rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                      <img
                                        src="https://geeksui.codescandy.com/geeks/assets/images/avatar/avatar-2.jpg"
                                        className="w-10 h-10 rounded-full object-cover mr-3"
                                        alt="avatar"
                                      />
                                      <div>
                                        <h6 className="font-semibold">
                                          Jane Smith
                                        </h6>
                                        <small className="text-gray-500">
                                          1 week ago
                                        </small>
                                      </div>
                                    </div>
                                    <div className="flex items-center mb-2">
                                      <span className="text-yellow-500">
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="far fa-star" />
                                      </span>
                                    </div>
                                    <p className="text-gray-700">
                                      Good course, but I wish there were more
                                      practical examples.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Modal for Adding Note */}
          {noteShow && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h4 className="text-lg font-bold mb-4">Add Note</h4>
                <textarea
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your note here..."
                  rows={4}
                ></textarea>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setNoteShow(false)}
                  >
                    Save
                  </button>
                  <button
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setNoteShow(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal for Asking Question */}
          {addQuestionShow && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="fixed inset-0 bg-black/50"
                onClick={handleQuestionClose}
              ></div>
              <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="text-xl font-semibold">Ask Question</h3>
                  <button
                    onClick={handleQuestionClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="p-4">
                  <form className="space-y-4" onSubmit={handleSaveQuestion}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Question Title
                      </label>
                      <input
                        value={formData.title}
                        name="title"
                        onChange={handleMessageChange}
                        type="text"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Question Message
                      </label>
                      <textarea
                        value={formData.message}
                        name="message"
                        onChange={handleMessageChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="10"
                      ></textarea>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={handleQuestionClose}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center space-x-2"
                        disabled={isSubmitting}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                          />
                        </svg>
                        <span>Close</span>
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                        disabled={isSubmitting}
                      >
                        <span>
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Community2;
