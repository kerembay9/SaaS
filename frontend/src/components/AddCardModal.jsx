import React, { useState } from 'react';

const AddCardModal = ({ isOpen, onClose, onAddCard }) => {
  const [status, setStatus] = useState('');
  const [summary, setSummary] = useState('');

  const handleSubmit = () => {
    // Validate input if needed
    if (status.trim() === '' || summary.trim() === '') {
      // Handle validation error
      return;
    }

    // Create a card object and pass it to the parent component
    const card = { status, summary };
    onAddCard(card);

    // Clear input fields and close the modal
    setStatus('');
    setSummary('');
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Card</h5>
            <button type="button" className="close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Status:</label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Summary:</label>
              <input
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Add
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;
