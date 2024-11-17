import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post('http://127.0.0.1:5555/signup', values);
        alert(response.data.message);
        resetForm();
        navigate('/login'); 
      } catch (error) {
        alert(error.response?.data?.error || 'Signup failed');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>Signup</h1>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formik.values.username}
        onChange={formik.handleChange}
      />
      {formik.touched.username && formik.errors.username && <div className="error-message">{formik.errors.username}</div>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      {formik.touched.email && formik.errors.email && <div className="error-message">{formik.errors.email}</div>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      {formik.touched.password && formik.errors.password && <div className="error-message">{formik.errors.password}</div>}

      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
