import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/contact", {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
        setMessages(res.data);
      } catch (err) {
        setError("Failed to fetch messages. Please try again later.");
      }
    };

    fetchMessages();
  }, []);

  const cancelMessages = async (message) => {
    if (!window.confirm("Are you sure you want to cancel")) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/contact/${message._id}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setMessages(messages.filter((m) => m._id !== message._id));
      toast.success("Message Cancelled Successfully");
    } catch (err) {
      setError("Failed to cancel the Message. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto p-6 mt-8 bg-gradient-to-br from-teal-100 via-teal-300 to-teal-400 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-teal-800">Submitted Contact Messages</h1>
      {error && <div className="alert alert-danger mb-4 text-center text-red-700">{error}</div>}

      <table className="table-auto w-full text-sm bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-teal-800 text-white text-center">
            <th className="px-6 py-3 font-semibold">Name</th>
            <th className="px-6 py-3 font-semibold">Email</th>
            <th className="px-6 py-3 font-semibold">Message</th>
            <th className="px-6 py-3 font-semibold">Date</th>
            <th className="px-6 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.length > 0 ? (
            messages.map((message) => (
              <tr key={message._id} className="text-center hover:bg-teal-100">
                <td className="px-6 py-3">{message.name}</td>
                <td className="px-6 py-3">{message.email}</td>
                <td className="px-6 py-3">{message.message}</td>
                <td className="px-6 py-3">{new Date(message.date).toLocaleString()}</td>
                <td className="px-6 py-3">
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent modal from opening
                      cancelMessages(message);
                    }}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-teal-600">
                No messages found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContactMessages;
