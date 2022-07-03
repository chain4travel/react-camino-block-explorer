import * as React from 'react';
import Replay from '@mui/icons-material/Replay';
import { Button } from '@mui/material';

export default function GlobalReloadButton() {
  return (
    <Button
      variant="outlined"
      color="secondary"
      sx={{ borderRadius: '25px', marginLeft: 'auto' }}
    >
      <Replay />
    </Button>
  );
}
