//Only for delete user confirmation
import React from 'react';
import './Modal.css'; 

const ConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Are you sure you want to delete this user?</h3>
        <div className="modal-actions">
          <button onClick={onConfirm} className="confirm-btn">Yes</button>
          <button onClick={onClose} className="cancel-btn">No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
