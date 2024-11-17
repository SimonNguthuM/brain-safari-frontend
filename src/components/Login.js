import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://brain-safari-backend.onrender.com/login",
          values,
          {
            withCredentials: true,
          }
        );
        alert(response.data.message);
        navigate("/profile");
      } catch (error) {
        alert(error.response?.data?.error || "Login failed");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>Login</h1>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formik.values.username}
        onChange={formik.handleChange}
      />
      {formik.touched.username && formik.errors.username && (
        <div className="error-message">{formik.errors.username}</div>
      )}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      {formik.touched.password && formik.errors.password && (
        <div className="error-message">{formik.errors.password}</div>
      )}

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
