import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title = 'Confirm Action',
  message,
  confirmText = 'Yes',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={onCancel}></div>
      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 animate-fadeInUp">
        {title && <h3 className="text-lg font-bold mb-2 text-center">{title}</h3>}
        <p className="text-gray-700 mb-6 text-center">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            className="btn-outline px-6 py-2 rounded font-medium"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className="btn-primary px-6 py-2 rounded font-medium"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
