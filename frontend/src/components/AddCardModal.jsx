import React, { useState } from 'react';

function AddCardModal({ isOpen, onClose, onSend }) {
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState('');

  const handleSend = () => {
    fetch(`http://127.0.0.1:8000/kanban/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'summary' : summary,
              'status' : status
            })
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Failed to delete event: ${response.statusText}`);
              }
            })
            .catch((error) => {
              console.error('Error deleting customer:', error);
            });
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'} fixed inset-0 overflow-y-auto flex justify-center items-center`}>
      <div className="modal-content  my-10 p-6 bg-white rounded-lg shadow-lg w-64">
        <h2 className="text-lg font-semibold mb-4">Enter Summary and Status</h2>
        <input
          type="text"
          placeholder="Summary"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input
          type="text"
          placeholder="Status"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSend}
          >
            Send
          </button>
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCardModal;
