import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useOutletContext();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      setError("");
      try {
        const response = await fetch('https://brain-safari-backend.onrender.com/login', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          
          Cookies.set("username", data.user);
          
          handleLogin(data.user);
          navigate("/profile");
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Invalid email or password");
        }
      } catch (error) {
        setError("Failed to log in. Please try again.");
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-300 to-coral-300 flex justify-center items-center">
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-teal-700 mb-4">Login</h2>
        <div className="input-group mb-4">
          <label htmlFor="email" className="block text-teal-700">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          ) : null}
        </div>
        <div className="input-group mb-6">
          <label htmlFor="password" className="block text-teal-700">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          ) : null}
        </div>
        <button type="submit" className="w-full py-3 bg-coral-500 text-white rounded-full hover:bg-coral-600 transition">
          Login
        </button>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
