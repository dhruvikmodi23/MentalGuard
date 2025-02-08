import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password,
      });
      const token = res.data.token;
      login(token); // Use the login function from context to set token and user state
      toast.success("Logged in successfully!");

      // Redirect based on the user's role
      const decoded = jwtDecode(token);
      setTimeout(() => {
        if (decoded.user.isAdmin) {
          navigate("/");
        } else {
          navigate("/");
        }
      }, 1500); // Delay of 2000ms (2 seconds)
    } catch (err) {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4F1F4] to-[#75E6DA] flex items-center justify-center relative">
      <ToastContainer />
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg animate__animated animate__fadeInUp">
        <h2 className="text-3xl font-bold text-center text-[#05445E] mb-12">Login</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
              className="w-full p-3 border border-[#75E6DA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#75E6DA]"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              className="w-full p-3 border border-[#75E6DA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#75E6DA]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#75E6DA] text-[#05445E] rounded-md hover:bg-[#63C4BA] focus:ring-2 focus:ring-[#2D5C57]"
          >
            Login
          </button>
        </form>
        <p className="mt-3 text-center">
          New user? <Link to="/register" className="text-[#75E6DA]">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
