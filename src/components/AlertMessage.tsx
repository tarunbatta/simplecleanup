import React from 'react';

interface AlertMessageProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  show,
  onClose,
}) => {
  if (!show) {
    return null;
  }

  return (
    <div id="dvAlert">
      <div className="alert alert-warning alert-dismissible" role="alert">
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={onClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div id="lblMessage">{message}</div>
      </div>
    </div>
  );
};

export default AlertMessage;
