import React, { useState, useEffect } from 'react';
import { Box, FormControl, FormGroup } from '@mui/material';

import CheckboxList from './CheckboxList';
import Button from './Button';
import AlertMessage from './AlertMessage';
import { useCleanup } from '../hooks/useCleanup';
import { CleanupState, CLEANUP_OPTIONS } from '../types/cleanup';

const CleanUpApp: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [checkboxes, setCheckboxes] = useState<CleanupState>(() =>
    Object.keys(CLEANUP_OPTIONS).reduce(
      (acc, key) => ({
        ...acc,
        [key]: false,
      }),
      {} as CleanupState,
    ),
  );

  const {
    historyCount,
    cookieCount,
    downloadCount,
    handleCleanup,
    handleCleanAll,
    refreshCounts,
  } = useCleanup();

  // Add effect to auto-dismiss alert after 5 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
        setMessage('');
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showAlert]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setCheckboxes((prevState) => ({
      ...prevState,
      [value]: checked,
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    setCheckboxes(
      Object.keys(CLEANUP_OPTIONS).reduce(
        (acc, key) => ({
          ...acc,
          [key]: checked,
        }),
        {} as CleanupState,
      ),
    );
  };

  const handleCleanClick = () => {
    const selectedCheckboxes = Object.entries(checkboxes)
      .filter(([, checked]) => checked)
      .map(([id]) => id);

    if (handleCleanup(selectedCheckboxes)) {
      setShowAlert(true);
      setMessage('Cleanup successful!!');
      handleSelectAll(false);
    } else {
      setShowAlert(true);
      setMessage('Please select at least one option to clean');
    }
  };

  const handleCleanAllClick = () => {
    if (handleCleanAll()) {
      setShowAlert(true);
      setMessage('Cleanup successful!!');
      handleSelectAll(false);
      setTimeout(() => {
        refreshCounts();
      }, 200);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    setMessage('');
  };

  return (
    <Box sx={{ width: 400, p: 2 }}>
      <AlertMessage
        message={message}
        show={showAlert}
        onClose={handleAlertClose}
      />

      <FormControl component="fieldset" fullWidth sx={{ mt: 2 }}>
        <FormGroup>
          <CheckboxList
            checkboxes={checkboxes}
            historyCount={historyCount}
            cookieCount={cookieCount}
            downloadCount={downloadCount}
            handleCheckboxChange={handleCheckboxChange}
            onSelectAll={handleSelectAll}
          />
          <Box mt={3} display="flex" flexDirection="column" gap={2}>
            <Button text="Clean" onClick={handleCleanClick} fullWidth />
            <Button
              text="Clean All"
              onClick={handleCleanAllClick}
              fullWidth
              sx={{
                backgroundColor: 'error.main',
                '&:hover': {
                  backgroundColor: 'error.dark',
                },
              }}
            />
          </Box>
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default CleanUpApp;
