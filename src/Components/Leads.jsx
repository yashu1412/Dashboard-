import React, { useState } from 'react';
import ProfilePage from './Profile'; 

const initialLeadsData = [
  { id: 1, name: 'John Doe', status: 'Interested' },
  { id: 2, name: 'Jane Smith', status: 'Contacted' },
  { id: 3, name: 'Sam Johnson', status: 'Closed' },
];

function Leads({ openModal }) {
  const [leadsData, setLeadsData] = useState(initialLeadsData);
  const [newLead, setNewLead] = useState({ name: '', status: '' });
  const [isFormVisible, setFormVisible] = useState(false);
  const [showProfile, setShowProfile] = useState(false); // State to handle profile visibility
  const [selectedLead, setSelectedLead] = useState(null); // State to track selected lead

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLead({ ...newLead, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newLead.name && newLead.status) {
      setLeadsData([...leadsData, { id: leadsData.length + 1, ...newLead }]);
      setNewLead({ name: '', status: '' });
      setFormVisible(false);
    }
  };

  const viewProfile = (lead) => {
    setSelectedLead(lead);
    setShowProfile(true); // Show profile when a lead is selected
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-lg shadow-lg border-2 border-gray-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Leads</h3>
        <button
          onClick={() => setFormVisible(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transform transition-transform duration-300 hover:scale-105"
        >
          Add Lead
        </button>
      </div>

      {!showProfile ? (
        <table className="min-w-full text-white">
          <thead>
            <tr className="bg-purple-700">
              <th className="px-5 py-3 text-left">Name</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leadsData.map((lead) => (
              <tr key={lead.id} className="hover:bg-purple-600 transition-colors duration-200">
                <td className="px-5 py-5">{lead.name}</td>
                <td className="px-5 py-5">{lead.status}</td>
                <td className="px-5 py-5 text-right">
                  <button
                    className="text-blue-300 hover:text-blue-500 transform transition duration-300"
                    onClick={() => openModal(lead)}
                  >
                    View
                  </button>
                  <button
                    className="ml-4 text-green-300 hover:text-green-500 transform transition duration-300"
                    onClick={() => viewProfile(lead)}
                  >
                    Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ProfilePage lead={selectedLead} /> // Show profile if a lead is selected
      )}

      {/* Modal for Adding New Lead */}
      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all duration-300 scale-95 hover:scale-100"
          >
            <h4 className="text-xl font-semibold mb-4">Add New Lead</h4>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newLead.name}
              onChange={handleInputChange}
              className="block w-full p-2 mb-4 border rounded shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <select
              name="status"
              value={newLead.status}
              onChange={handleInputChange}
              className="block w-full p-2 mb-4 border rounded shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="" disabled>Select Status</option>
              <option value="Interested">Interested</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Closed">Closed</option>
              <option value="Not Interested">Not Interested</option>
            </select>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setFormVisible(false)}
                className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add Lead
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Leads;
