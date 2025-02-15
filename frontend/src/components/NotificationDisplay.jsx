import React, { useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { NotificationContext } from "../context/NotificationContext";

const NotificationDisplay = () => {
    const { notifications, removeNotification } = useContext(NotificationContext);

    // Function to mark a notification as read on the server
    const markNotificationAsRead = useCallback(
        async (_id) => {
            try {
                await axios.patch(
                    `http://localhost:5001/api/notifications/${_id}/mark-read`,
                    {},
                    {
                        headers: { "x-auth-token": localStorage.getItem("token") },
                    }
                );
                removeNotification(_id); // Remove it from the frontend after marking as read
            } catch (error) {
                console.error("Error marking notification as read:", error);
            }
        },
        [removeNotification]
    );

    useEffect(() => {
        if (notifications.length > 0) {
            notifications.forEach((notification) => {
                setTimeout(() => {
                    markNotificationAsRead(notification._id);
                }, 4000); // 4000ms = 4 seconds
            });
        }
    }, [notifications, markNotificationAsRead]);

    return (
        <div className="fixed top-5 right-5 space-y-3">
            {notifications.map((notification) => (
                <div
                    key={notification._id}
                    className="bg-blue-500 text-white px-4 py-3 rounded-md shadow-md"
                >
                    <div className="flex justify-between items-center">
                        <strong>Notification</strong>
                        <small>Just now</small>
                    </div>
                    <p>{notification.message}</p>
                </div>
            ))}
        </div>
    );
};

export default NotificationDisplay;