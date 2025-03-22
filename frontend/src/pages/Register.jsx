import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"; // Import Google OAuth

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:5001/api/auth/register", {
        name,
        email,
        password,
      });
      toast.success("Registration successful! Please login.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Registration failed");
    }
  };

  // Handle Google login success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:5001/api/auth/google", {
        name,
        email,
        password,
        token: credentialResponse.credential,
      });
      toast.success("Google login successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error("Google authentication failed");
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-100 via-teal-300 to-teal-400">
        <ToastContainer />
        <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-center text-teal-800 mb-8">
            Register
          </h2>
          <form onSubmit={onSubmit}>
            <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" className="w-full p-3 border border-teal-300 rounded-lg text-teal-800 mb-5" required />
            <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" className="w-full p-3 border border-teal-300 rounded-lg text-teal-800 mb-5" required />
            <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" className="w-full p-3 border border-teal-300 rounded-lg text-teal-800 mb-5" required />
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} placeholder="Confirm Password" className="w-full p-3 border border-teal-300 rounded-lg text-teal-800 mb-6" required />
            <button type="submit" className="w-full py-3 bg-teal-400 text-teal-800 rounded-lg font-semibold hover:bg-teal-500 transition duration-300">
              Register
            </button>
          </form>

          <div className="mt-5 flex items-center justify-center">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => toast.error("Google Login Failed")} />
          </div>

          <p className="mt-4 text-center">
            Already registered?{" "}
            <Link to="/login" className="text-teal-600 hover:text-teal-800">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Register;
