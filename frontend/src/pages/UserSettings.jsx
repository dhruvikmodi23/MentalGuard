import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserSettings = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('/api/auth/user', {
          headers: {
            'x-auth-token': token,
          },
        });
        setFormData({ name: res.data.name, email: res.data.email });
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchUserData();
  }, []);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put('/api/auth/user', formData, {
        headers: {
          'x-auth-token': token,
        },
      });
      console.log('Profile updated successfully');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-teal-100 via-teal-300 to-teal-400 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6 text-teal-800">User Settings</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="name" className="block text-teal-800 font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            className="w-full p-3 rounded-md border border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="block text-teal-800 font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="w-full p-3 rounded-md border border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition duration-300"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserSettings;
