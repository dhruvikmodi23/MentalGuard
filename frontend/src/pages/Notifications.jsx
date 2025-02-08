import React, { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notifications", {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-[#05445E] mb-6">Notifications</h1>
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className="bg-white p-4 rounded-lg shadow-md hover:bg-[#f0f9fc] transition"
            >
              <p className="text-lg text-[#05445E]">{notification.message}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-[#05445E]">No notifications found.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
