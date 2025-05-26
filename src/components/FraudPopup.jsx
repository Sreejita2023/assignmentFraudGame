import React from "react";
import "../styles/FraudPopup.css";
import { X } from "lucide-react"; // Optional: you can use an SVG or Unicode instead

const FraudPopup = ({ onClose }) => {
  return (
    <div className="fraud-popup-overlay">
      <div className="fraud-popup-container">
        <div className="popup-cross-wrapper" onClick={onClose}>
          <div className="popup-cross-circle">
            <X size={30} color="white" />
          </div>
        </div>
        <button onClick={onClose} className="popup-fraud-button">
          It’s a fraud message
        </button>
      </div>
    </div>
  );
};

export default FraudPopup;
