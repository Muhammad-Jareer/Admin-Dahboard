import React from 'react';

const Modal = ({ show, handleClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg">
        <button className="mb-4 bg-red-500 text-white px-2 py-1 rounded" onClick={handleClose}>Close</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
