import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const newUser = { name, email, password };

    // Send the registration request to the server
    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/register",
        newUser
      );
      toast.success("Registration successful! Please login."); // Toast notification
      setTimeout(() => {
        navigate("/login"); // Navigate to login page
      }, 2000);
    } catch (err) {
      // Check if the error response indicates that the user already exists
      if (err.response?.data?.msg === "Email is already registered.") {
        toast.error("Email already exists! Please use a different email.");
        setErrorMessage(err.response?.data?.msg);
      } else {
        toast.error(
          err.response?.data?.msg || "An error occurred during registration"
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-100 via-teal-300 to-teal-400">
      <ToastContainer />
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center text-teal-800 mb-8">
          Register
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-5">
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Name"
              className="w-full p-3 border border-teal-300 rounded-lg text-teal-800"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
              className="w-full p-3 border border-teal-300 rounded-lg text-teal-800"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              className="w-full p-3 border border-teal-300 rounded-lg text-teal-800"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              placeholder="Confirm Password"
              className="w-full p-3 border border-teal-300 rounded-lg text-teal-800"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-teal-400 text-teal-800 rounded-lg font-semibold hover:bg-teal-500 transition duration-300"
          >
            Register
          </button>
        </form>
        {successMessage && (
          <p className="text-green-600 mt-4 font-bold">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-600 mt-4 font-bold">{errorMessage}</p>
        )}
        <p className="mt-4 text-center">
          Already registered?{" "}
          <Link to="/login" className="text-teal-600 hover:text-teal-800">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
