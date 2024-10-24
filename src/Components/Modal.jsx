
import React from 'react';

function Modal({ lead, closeModal }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center border-2 border-gray-500">
      <div className="bg-white p-6 w-1/2 rounded-lg">
        <h2 className="text-2xl mb-4">Lead Details</h2>
        <p>Name: {lead.name}</p>
        <p>Status: {lead.status}</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
