import React from 'react';
import './CustomizationPopup.css';

const CustomizationPopup = ({ isOpen, onClose, onCustomize, onOrderDirectly, burgerName }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3 className="popup-title">Customize your {burgerName}?</h3>
                <p className="popup-desc">
                    Would you like to build this burger with your own choice of ingredients, or order it as our chef designed it?
                </p>

                <div className="popup-actions">
                    <button
                        onClick={onOrderDirectly}
                        className="btn-order-direct"
                    >
                        <span>🚀</span> Order As Is
                    </button>

                    <button
                        onClick={onCustomize}
                        className="btn-customize"
                    >
                        <span>🎨</span> Customize It
                    </button>

                    <button
                        onClick={onClose}
                        className="btn-cancel"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomizationPopup;
