
import React from 'react';

interface UpgradeModalProps {
  featureName: string;
  onClose: () => void;
  onUpgrade: () => void; // For simulation, this will toggle premium status
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ featureName, onClose, onUpgrade }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[100]" 
      aria-modal="true" 
      role="dialog"
      onClick={onClose} // Close on backdrop click
    >
      <div 
        className="bg-white p-6 md:p-8 rounded-xl shadow-2xl max-w-md w-full text-center"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
      >
        <div className="flex justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-yellow-500">
            <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3A5.25 5.25 0 0012 1.5zm-3.75 5.25a3.75 3.75 0 107.5 0v3h-7.5v-3z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-3">Unlock Premium Access!</h2>
        <p className="text-slate-600 mb-2">
          Access to <strong className="text-slate-700">{featureName}</strong> is a premium feature.
        </p>
        <p className="text-slate-600 mb-6">
          Upgrade to PyMentor Premium to unlock all modules, unlimited AI assistant queries, and more advanced playground features.
        </p>
        
        <div className="space-y-3">
            <button 
                onClick={() => {
                    onUpgrade();
                    onClose();
                }}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
            >
                Upgrade to Premium (Simulated)
            </button>
            <button 
                onClick={onClose}
                className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-2.5 px-6 rounded-lg transition-colors"
            >
                Maybe Later
            </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;