
import React, { useState } from 'react';

function Settings() {
  const [formData, setFormData] = useState({
    emailNotifications: true,
    smsNotifications: false,
    privacySettings: 'public',
  });

  const handleInputChange = (e) => {
    const { name, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log('Settings updated:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-400 to-indigo-600 border-2 border-gray-500">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Settings</h2>

      {/* Notification Settings */}
      <section className="mb-8 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Notification Settings</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center transition-transform transform hover:scale-105">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={formData.emailNotifications}
              onChange={handleInputChange}
              className="mr-2 border-blue-400 rounded-lg focus:ring focus:ring-blue-300"
            />
            <label className="text-gray-700">Email Notifications</label>
          </div>
          <div className="flex items-center transition-transform transform hover:scale-105">
            <input
              type="checkbox"
              name="smsNotifications"
              checked={formData.smsNotifications}
              onChange={handleInputChange}
              className="mr-2 border-blue-400 rounded-lg focus:ring focus:ring-blue-300"
            />
            <label className="text-gray-700">SMS Notifications</label>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-white text-blue-600 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Save Notification Preferences
          </button>
        </form>
      </section>

      {/* Privacy Settings */}
      <section className="mb-8 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Privacy Settings</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Privacy</label>
            <select
              name="privacySettings"
              value={formData.privacySettings}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-white text-blue-600 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Save Privacy Settings
          </button>
        </form>
      </section>
    </div>
  );
}

export default Settings;
