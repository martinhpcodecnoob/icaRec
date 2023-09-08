'use client'

import React, { useState } from 'react';

const PopupEnvoltorio = ({ children, title, isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay bg-gray-800 bg-opacity-50 fixed inset-0" onClick={onClose}></div>
          <div className="modal-content bg-white rounded-lg shadow-lg" style={{ zIndex: '51', width: '350px', height: '500px' }}>
            <div className="modal-header bg-gray-200 p-4 rounded-t-lg">
              <h2 className="text-xl font-semibold">{title}</h2>
              <button onClick={onClose} className="text-red-500 font-bold absolute top-2 right-2">
                &#x2715;
              </button>
            </div>
            <div className="modal-body p-4">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupEnvoltorio;
