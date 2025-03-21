import React, { useState } from "react";

const PremiumPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Function to call API
  const handleSubscribe = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5001/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "Premium" }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`✅ ${data.message}`);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage("❌ Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold text-blue-600">Go Premium</h2>
        <p className="text-gray-600 mt-2">Unlock exclusive features for better mental health</p>

        {/* Features List */}
        <div className="mt-6 text-left space-y-3">
          <p className="flex items-center"><span className="text-green-500 mr-2">✔️</span> Unlimited Chat Support</p>
          <p className="flex items-center"><span className="text-green-500 mr-2">✔️</span> One-on-One Counseling</p>
          <p className="flex items-center"><span className="text-green-500 mr-2">✔️</span> Premium Mental Health Resources</p>
          <p className="flex items-center"><span className="text-green-500 mr-2">✔️</span> Priority Support</p>
        </div>

        {/* Price */}
        <p className="text-2xl font-semibold text-blue-600 mt-6">₹799 / Month</p>

        {/* Subscribe Button */}
        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Processing..." : "Upgrade Now"}
        </button>

        {/* Message Display */}
        {message && <p className="mt-4 text-lg text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default PremiumPage;
