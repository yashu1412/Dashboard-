import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import Leads from './Components/Leads';
import Modal from './Components/Modal';
import Reports from './Components/Reports';
import ProfilePage from './Components/Profile';
import Settings from './Components/Setting';
import './App.css';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const openModal = (lead) => {
    setSelectedLead(lead);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <Router>
      <div className="flex h-screen gradient-bg"> 
        <Sidebar />
        <div className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<Leads openModal={openModal} />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
        {isModalOpen && <Modal lead={selectedLead} closeModal={closeModal} />}
      </div>
    </Router>
  );
}

export default App;
