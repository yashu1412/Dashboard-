
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';

const initialLeadData = [
  { id: 1, name: 'John Doe', status: 'Interested', email: 'john@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Jane Smith', status: 'Contacted', email: 'jane@example.com', phone: '098-765-4321' },
  { id: 3, name: 'Sam Johnson', status: 'Qualified', email: 'sam@example.com', phone: '555-555-5555' },
  { id: 4, name: 'Alice Brown', status: 'Interested', email: 'alice@example.com', phone: '444-444-4444' },
  { id: 5, name: 'Bob White', status: 'Not Interested', email: 'bob@example.com', phone: '333-333-3333' },
];

function Reports() {
  const [leadData, setLeadData] = useState(initialLeadData);
  const [isFormVisible, setFormVisible] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', status: '', email: '', phone: '' });

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Lead Report', 10, 10);
    leadData.forEach((lead, index) => {
      doc.text(`${index + 1}. ${lead.name} - ${lead.status} (${lead.email}, ${lead.phone})`, 10, 20 + index * 10);
    });
    doc.save('report.pdf');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLead({ ...newLead, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLeadData([...leadData, { ...newLead, id: leadData.length + 1 }]);
    setNewLead({ name: '', status: '', email: '', phone: '' });
    setFormVisible(false);
  };

  return (
    <div className="mt-10 p-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg border-2 border-gray-500">
      <h3 className="text-3xl font-bold text-white mb-6">Generate Reports</h3>
      <div className="flex justify-between mb-4">
        <div>
          <button
            className="mr-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50"
            onClick={generatePDF}
          >
            Download PDF
          </button>
          <CSVLink
            data={leadData}
            filename="report.csv"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
          >
            Download CSV
          </CSVLink>
        </div>
        <button
          onClick={() => setFormVisible(true)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50"
        >
          Add More
        </button>
      </div>

      {/* Form for Adding New Lead */}
      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-transform scale-90 hover:scale-100"
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
              <option value="Not Interested">Not Interested</option>
              <option value="Follow Up">Follow Up</option>
            </select>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newLead.email}
              onChange={handleInputChange}
              className="block w-full p-2 mb-4 border rounded shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={newLead.phone}
              onChange={handleInputChange}
              className="block w-full p-2 mb-4 border rounded shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
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
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Add Lead
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-8">
        <h4 className="text-xl font-semibold text-white">Lead List</h4>
        <table className="min-w-full mt-4 bg-white rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {leadData.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{lead.id}</td>
                <td className="py-2 px-4 border-b">{lead.name}</td>
                <td className="py-2 px-4 border-b">{lead.status}</td>
                <td className="py-2 px-4 border-b">{lead.email}</td>
                <td className="py-2 px-4 border-b">{lead.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;
