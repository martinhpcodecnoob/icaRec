'use client'

import React from 'react'

const Popup = ({ children, isOpen, onClose, onCloseAll, zIndex }) => {

  const handleClickOutside = (event) => {
    if (isOpen && event.target.classList.contains('popup-overlay')) {
      if (onCloseAll) {
        onCloseAll();
      } else if (onClose) {
        onClose();
      }
    }
  };
  
  const closePopup = () => {
    if (onClose) {
      onClose()
    }
  }

  return isOpen ? (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="popup-overlay bg-gray-800 bg-opacity-50 fixed inset-0"
          style={{ zIndex: zIndex || 50 }}
          onClick={handleClickOutside}
        ></div>
        <div
          className="popup-content bg-white rounded-lg shadow-lg"
          style={{ zIndex: zIndex ? zIndex + 1 : 51, width: '350px', height: '500px' }}
        >
          {children}
        </div>
      </div>
    </div>
  ) : null
}

export default Popup
