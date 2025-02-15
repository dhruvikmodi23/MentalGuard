import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Appointments = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    date: "",
    time: "",
    service: "Counseling",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const { name, email, message, date, time, service } = formData;

  // Calculate today's date and time
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];
  const currentTime = today.toTimeString().substring(0, 5); // Get the current time in "HH:MM" format

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5001/api/appointments",
        formData,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setSubmitted(true);
      toast.success(res.data.message);
      setError("");
    } catch (err) {
      setError("Failed to book the appointment. Please try again later.");
      toast.error(
        err.response?.data?.message || "Failed to book the appointment."
      );
      setSubmitted(false);
    }
  };

  const isToday = date === todayDate;
  const minTime = isToday ? currentTime : "00:00";

  return (
    <div className="bg-gradient-to-br from-[#D4F1F4] to-[#75E6DA] min-h-screen p-6 text-[#05445E]">
      <h1 className="text-4xl font-bold text-center mb-8">Book an Appointment</h1>
      <p className="text-lg text-center mb-8">Schedule your appointment with our mental health professionals...</p>

      {submitted && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
          Your appointment has been booked successfully!
        </div>
      )}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded">
          {error}
        </div>
      )}

      <form className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto" onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Enter your name"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="service" className="block text-lg font-medium">Service</label>
          <select
            name="service"
            value={service}
            onChange={onChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
          >
            <option value="Counseling">Counseling</option>
            <option value="Workshop">Workshop</option>
            <option value="Resource Support">Resource Support</option>
          </select>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label htmlFor="date" className="block text-lg font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={onChange}
              min={todayDate}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="time" className="block text-lg font-medium">Time</label>
            <input
              type="time"
              name="time"
              value={time}
              onChange={onChange}
              min={minTime}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-lg font-medium">Message</label>
          <textarea
            name="message"
            rows="3"
            value={message}
            onChange={onChange}
            placeholder="Enter any additional information here"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#68D8CD] hover:bg-[#63C4BA] text-white font-bold py-3 rounded-lg transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Appointments;
