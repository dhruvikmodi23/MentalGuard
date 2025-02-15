// src/components/Notifications.js
import React, { useEffect } from "react";
import io from "socket.io-client";

const Notifications = () => {
  useEffect(() => {
    const socket = io.connect("http://localhost:5001");
    socket.on("notification", (data) => {
      alert(data.message);
    });
  }, []);

  return null;
};

export default Notifications;
