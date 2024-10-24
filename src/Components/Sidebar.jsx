import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaFileAlt, FaUserCog, FaUser } from "react-icons/fa";

// Dummy profile data, replace with actual profile fetching logic
const profile = {
  name: "John Doe",
  email: "johndoe@gmail.com",
  avatar: null, // Avatar might be null initially
};

const SidebarContext = createContext();

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const [profilePic, setProfilePic] = useState(profile.avatar); // Initialize with profile avatar or null

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-gradient-to-r from-blue-400 to-blue-600 border-r shadow-lg transition-all duration-300">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
            alt="Logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 space-y-1">
            <SidebarItem to="/" text="Dashboard" icon={<FaTachometerAlt />} />
            <SidebarItem to="/leads" text="Leads" icon={<FaUsers />} alert={true} />
            <SidebarItem to="/reports" text="Reports" icon={<FaFileAlt />} />
            <SidebarItem to="/profile" text="Profile" icon={<FaUser />} />
            <SidebarItem to="/settings" text="Settings" icon={<FaUserCog />} />
          </ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3 items-center">
          <label htmlFor="profile-pic-upload">
            <img
              src={profilePic || "https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"}
              alt="User Avatar"
              className="w-10 h-10 rounded-md cursor-pointer"
            />
            <input
              id="profile-pic-upload"
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="hidden"
            />
          </label>
          <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
            <div className="leading-4 text-white">
              <h4 className="font-semibold">{profile?.name || "Anonymous"}</h4>
              <span className="text-xs text-gray-200">{profile?.email || "No Email"}</span>
            </div>
            <MoreVertical size={20} className="text-white" />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ to, text, icon, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li>
      <NavLink
        to={to}
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600 ${alert ? 'bg-indigo-100 text-indigo-800' : 'text-gray-600'}`}
      >
        <span className="mr-2">{icon}</span>
        <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
          {text}
        </span>
        {alert && <div className="absolute right-2 w-2 h-2 rounded bg-indigo-400" />}

        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-200 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </NavLink>
    </li>
  );
}
