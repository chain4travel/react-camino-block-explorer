import * as React from 'react';
import { Button } from '@mui/material';

function MainButton({
  variant,
  type = 'button',
  onClick,
  children,
  style,
}: {
  variant: 'contained' | 'outlined';
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      type={type}
      sx={{
        borderRadius: '12px',
        padding: '.55rem 2rem',
        backgroundColor:
          variant === 'outlined' ? 'transparent' : 'secondary.main',
        color: variant === 'outlined' ? 'secondary.main' : 'white',
        borderColor: variant === 'outlined' ? 'secondary.main' : '',
        boxShadow: 'none',
        borderWidth: '1.5px',
        '&:hover': {
          boxShadow: 'none',
          backgroundColor:
            variant === 'outlined' ? 'transparent' : 'secondary.main',
          borderColor: variant === 'outlined' ? 'secondary.main' : 'white',
        },
        ...style,
      }}
    >
      {children}
    </Button>
  );
}

export default React.memo(MainButton);
