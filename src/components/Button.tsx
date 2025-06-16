import React from 'react';
import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button' }) => {
  return (
    <MuiButton variant="contained" onClick={onClick} type={type}>
      {text}
    </MuiButton>
  );
};

export default Button;