import React from 'react';
import { Alert, AlertTitle, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
  if (!show || !message) {
    return null;
  }

  const isSuccess = message.toLowerCase().includes('successful');

  return (
    <Box sx={{ mt: 2, width: '100%' }}>
      <Alert
        severity={isSuccess ? 'success' : 'warning'}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
            sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ '& .MuiAlert-message': { width: '100%' } }}
      >
        <AlertTitle>{isSuccess ? 'Success' : 'Notice'}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};

export default AlertMessage;
