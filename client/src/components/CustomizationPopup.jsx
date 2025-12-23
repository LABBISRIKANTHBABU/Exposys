import React from 'react';

const CustomizationPopup = ({ isOpen, onClose, onCustomize, onOrderDirectly, burgerName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all scale-100">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Customize your {burgerName}?</h3>
                <p className="text-gray-600 mb-8">
                    Would you like to build this burger with your own choice of ingredients, or order it as our chef designed it?
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={onOrderDirectly}
                        className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition shadow-lg flex items-center justify-center gap-2"
                    >
                        <span>🚀</span> Order As Is
                    </button>

                    <button
                        onClick={onCustomize}
                        className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl hover:bg-orange-700 transition shadow-lg flex items-center justify-center gap-2"
                    >
                        <span>🎨</span> Customize It
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full text-gray-500 font-medium py-2 hover:text-gray-700"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomizationPopup;
