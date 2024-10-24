import React, { useState} from 'react';

const initialUserData = {
  name: 'Yashpalsingh Pawara',
  email: 'yash@example.com',
  phone: '123-456-7890',
  bio: 'Full Stack Developer with a passion for building web applications.',
  location: 'Jabalpur, India',
  skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
  socialLinks: {
    linkedin: 'https://linkedin.com/in/yashpawara',
    github: 'https://github.com/yashpalsinghpawara',
  },
  profilePicture: 'https://via.placeholder.com/150', 
};

function Profile() {
  const [userData, setUserData] = useState(() => {
    // Load user data from localStorage or use initial data
    const storedData = localStorage.getItem('userProfile');
    return storedData ? JSON.parse(storedData) : initialUserData;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(userData);
  const [profileImagePreview, setProfileImagePreview] = useState(userData.profilePicture);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  // Handle profile picture upload and preview
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
        setEditedUser({ ...editedUser, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(editedUser);
    localStorage.setItem('userProfile', JSON.stringify(editedUser)); // Save data to localStorage
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Main Profile Content */}
      <div className="max-w-4xl mx-auto mt-10 bg-gray-800 text-gray-100 p-10 rounded-xl shadow-lg flex-1">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">Profile</h2>

        {!isEditing ? (
          <div className="text-center space-y-8">
            <div className="relative">
              <img
                src={profileImagePreview}
                alt="Profile"
                className="mx-auto w-40 h-40 rounded-full border-4 border-indigo-400 shadow-lg"
              />
              <button
                onClick={handleEditClick}
                className="absolute top-0 right-0 mt-2 mr-2 bg-indigo-600 text-white rounded-full p-2 shadow-lg hover:bg-indigo-700 transition-colors"
              >
                Edit
              </button>
            </div>
            <h3 className="text-2xl font-semibold text-indigo-300">{userData.name}</h3>
            <p className="text-gray-300">{userData.email}</p>
            <p className="text-gray-300">{userData.phone}</p>
            <p className="text-gray-300">{userData.location}</p>
            <p className="text-indigo-200 italic">{userData.bio}</p>

            <div className="flex justify-center space-x-8 mt-4">
              <a
                href={userData.socialLinks.linkedin}
                className="text-indigo-500 text-3xl hover:text-indigo-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href={userData.socialLinks.github}
                className="text-indigo-500 text-3xl hover:text-indigo-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>

            <div className="mt-8">
              <h4 className="text-xl font-bold text-indigo-300 mb-2">Skills</h4>
              <div className="flex flex-wrap justify-center space-x-4 space-y-2">
                {userData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-700 text-indigo-200 px-4 py-2 rounded-lg shadow-md text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Upload */}
            <div>
              <label className="block text-indigo-300 font-semibold">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="w-full px-4 py-2 bg-gray-700 text-indigo-200 border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {profileImagePreview && (
                <img
                  src={profileImagePreview}
                  alt="Profile Preview"
                  className="mt-4 mx-auto w-32 h-32 rounded-full border-2 border-indigo-400"
                />
              )}
            </div>
            <div>
              <label className="block text-indigo-300 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 text-indigo-200 border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div>
              <label className="block text-indigo-300 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 text-indigo-200 border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div>
              <label className="block text-indigo-300 font-semibold">Phone</label>
              <input
                type="text"
                name="phone"
                value={editedUser.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 text-indigo-200 border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div>
              <label className="block text-indigo-300 font-semibold">Location</label>
              <input
                type="text"
                name="location"
                value={editedUser.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 text-indigo-200 border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div>
              <label className="block text-indigo-300 font-semibold">Bio</label>
              <textarea
                name="bio"
                value={editedUser.bio}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 text-indigo-200 border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Social Links */}
            <div>
              <label className="block text-indigo-300 font-semibold">LinkedIn</label>
              <input
                type="url"
                name="linkedin"
                value={editedUser.socialLinks.linkedin}
                onChange={handleInputChange}
                placeholder="Enter LinkedIn URL"
                className="w-full px-4 py-2 bg-gray-700 text-indigo-200 border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-indigo-300 font-semibold">GitHub</label>
              <input
                type="url"
                name="github"
                value={editedUser.socialLinks.github}
                onChange={handleInputChange}
                placeholder="Enter GitHub URL"
                className="w-full px-4 py-2 bg-gray-700 text-indigo-200 border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-4 bg-indigo-600 text-white rounded-full px-6 py-2 shadow-lg hover:bg-indigo-700 transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
