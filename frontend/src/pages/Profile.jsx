import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p className="text-center text-lg text-[#05445E]">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <img
          src={user.profileImage || "default-avatar.png"}
          alt="Profile"
          className="w-36 h-36 rounded-full mb-4"
        />
        <h3 className="text-2xl font-semibold text-[#05445E]">{user.name}</h3>
        <p className="text-lg text-[#05445E]">{user.email}</p>
        {/* Add more profile details if needed */}
      </div>
    </div>
  );
};

export default Profile;
