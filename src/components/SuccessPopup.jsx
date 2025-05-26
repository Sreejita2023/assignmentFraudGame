import React from "react";
import "../styles/SuccessPopup.css";
import { Check } from "lucide-react";

const SuccessPopup = ({ onClose }) => {
  return (
    <div className="success-popup-overlay">
      <div className="success-popup-content">
        <div className="success-check-wrapper">
          <div className="success-check-circle" onClick={onClose}>
            <Check color="white" size={28} strokeWidth={3} />
          </div>
        </div>
        <button onClick={onClose} className="success-button">
          It’s a safe message
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
