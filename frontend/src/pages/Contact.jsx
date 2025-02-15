import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { name, email, message } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5001/api/contact", formData);
      toast.success("Message submitted successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Error submitting the message, please try again!");
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#D4F1F4] to-[#75E6DA] py-16 text-[#05445E] relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#D4F1F4] to-[#75E6DA] z-[-1]" />
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <form className="max-w-3xl mx-auto" onSubmit={onSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-lg font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              className="w-full p-3 border rounded-md"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              className="w-full p-3 border rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-lg font-semibold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={onChange}
              rows="4"
              className="w-full p-3 border rounded-md"
              placeholder="Enter your message"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#75E6DA] hover:bg-[#63C4BA] text-white font-bold rounded-md transition-colors"
          >
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Contact;
