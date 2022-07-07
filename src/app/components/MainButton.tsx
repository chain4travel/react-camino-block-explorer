import * as React from 'react';
import { Button } from '@mui/material';

export default function MainButton({
  variant,
  onClick,
  children,
  ...customStyle
}: {
  variant: 'contained' | 'outlined';
  onClick?: () => void;
  children: React.ReactNode;
  customStyle?: React.CSSProperties;
}) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      sx={{
        borderRadius: '12px',
        padding: '.55rem 2rem',
        backgroundColor:
          variant === 'outlined' ? 'transparent' : 'secondary.main',
        color: variant === 'outlined' ? 'secondary.main' : 'white',
        borderColor: variant === 'outlined' ? 'secondary.main' : '',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
          backgroundColor:
            variant === 'outlined' ? 'transparent' : 'secondary.main',
          borderColor: variant === 'outlined' ? 'secondary.main' : 'white',
        },
        ...customStyle,
      }}
    >
      {children}
    </Button>
  );
}
