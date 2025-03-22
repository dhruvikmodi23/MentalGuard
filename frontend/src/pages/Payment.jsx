import React, { useState, useContext } from "react";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import { AuthContext } from "../context/AuthContext"; // Ensure this exists
import toast from "react-hot-toast";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(AuthContext); // Using Context API

  if (!user) {
    toast.error("User not found! Please log in.");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <button disabled className="bg-gray-300 text-gray-500 py-2 px-6 rounded-md cursor-not-allowed">
          Login Required
        </button>
      </div>
    );
  }

  const userId = user._id;

  // Function to dynamically load Razorpay SDK
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        throw new Error("Failed to load Razorpay SDK. Please check your internet connection.");
      }

      const res = await axios.post(
        "http://localhost:5001/api/payment/create-order", // Amount in INR
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          }
        },
        { amount: 500 },
      );

      if (!res.data.data.order) {
        throw new Error("Invalid order response from server.");
      }

      const options = {
        key: "",
        amount: res.data.data.order.amount * 100,
        currency: "INR",
        name: "MentalGuard",
        description: "Premium Membership",
        order_id: res.data.data.order.id,
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post(
              "http://localhost:5001/api/payment/verify-payment",
              { ...response, userId },
              {
                headers: {
                  "x-auth-token": localStorage.getItem("token"),
                },
              }
            );

            if (verifyResponse.data.success) {
              const updatedUser = { ...user, isPremium: true };
              setUser(updatedUser); // Update user in Context API

              toast.success("Payment Successful! 🎉");
            } else {
              toast.error("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed! ❌");
          }
        },
        prefill: {
          name: user.name || "Test User",
          email: user.email || "test@example.com",
          contact: user.phone || "9999999999",
        },
        theme: { color: "#4F46E5" },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment Failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg max-w-lg w-full p-6 space-y-6">
        {user.isPremium ? (
          <div className="text-center">
            <CheckCircle className="mx-auto text-green-500 w-16 h-16" />
            <h1 className="text-2xl font-bold text-gray-800">You are a Premium Member!</h1>
            <p className="text-gray-500 mt-2">
              Enjoy exclusive features and benefits as a premium user.
            </p>
            <button className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md cursor-not-allowed" disabled>
              Premium Activated ✅
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center text-gray-800">Premium Membership</h1>
            <p className="text-center text-gray-500 text-sm">
              Get access to exclusive features by becoming a premium member.
            </p>
            <p className="text-2xl font-semibold text-center text-blue-600">₹799 / Month</p>
            <button
              onClick={handlePayment}
              disabled={loading}
              className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Processing..." : "Buy Premium Membership"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
