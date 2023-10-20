import React, { useState } from 'react';

function AddCardModal({ isOpen, onClose, refetch }) {
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState('Open');

  const handleSend = () => {
    fetch(`http://127.0.0.1:8000/kanban/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'Summary' : summary,
              'Status' : status
            }),
            
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Failed to add kanban event: ${response.statusText}`);
              }
              else {
                refetch();
              }
            })
            .catch((error) => {
              console.error('Error deleting customer:', error);
            },
            );
    onClose();
  };

  return (    
    <div className={`modal ${isOpen ? 'block' : 'hidden'} absolute inset-0 w-full overflow-y-auto flex justify-center items-center max-h-[815px] h-full `}>
      <div className="modal-content  my-10 p-6 bg-white rounded-lg shadow-lg w-65">
        <h2 className="text-lg font-semibold mb-4">Açıklama ve Öncelik giriniz</h2>
        <input
          type="text"
          placeholder="Açıklama"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <select
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Open">Açıldı</option>
          <option value="InProgress">Yürütülüyor</option>
          <option value="Testing">Test Aşaması</option>
          <option value="Done">Tamamlandı</option>
        </select>
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSend}
          >
            Ekle
          </button>
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={onClose}
          >
            İptal
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCardModal;
