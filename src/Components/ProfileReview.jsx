import React from 'react';
import { Link } from 'react-router-dom';

function ProfilePreview({ avatar }) {
  const userProfile = {
    name: "Yashpalsingh Pawara",
    avatar: avatar || "https://via.placeholder.com/150",  
  };

  return (
    <div className="flex items-center space-x-4 bg-gradient-to-r from-purple-400 to-purple-600 p-4 rounded-lg shadow-lg text-white">
      <img
        src={userProfile.avatar}
        alt="User Avatar"
        className="w-12 h-12 rounded-full"
      />
      <div>
        <h4 className="text-lg font-bold">{userProfile.name}</h4>
        <Link to="/profile" className="text-sm text-gray-300">
          View Profile
        </Link>
      </div>
    </div>
  );
}

export default ProfilePreview;
