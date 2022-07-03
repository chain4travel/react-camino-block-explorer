import * as React from 'react';
import Button from '@mui/material/Button';

export default function OutlinedButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <Button
      {...props}
      variant="outlined"
      color="secondary"
      sx={{ borderRadius: '12px' }}
    >
      {props.children}
    </Button>
  );
}
