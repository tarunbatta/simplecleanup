import React from 'react';
import { Button as MuiButton, SxProps, Theme } from '@mui/material';

interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = 'button',
  fullWidth,
  sx,
}) => {
  return (
    <MuiButton
      variant="contained"
      onClick={onClick}
      type={type}
      fullWidth={fullWidth}
      sx={sx}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
