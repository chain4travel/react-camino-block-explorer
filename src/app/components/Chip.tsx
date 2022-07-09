import * as React from 'react';
import { Box, Typography } from '@mui/material';

export default function Chip({
  label,
  style,
}: {
  label: string;
  style: React.CSSProperties;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'latestList.iconBackground',
        width: 'min-content',
        padding: '3px 10px 3px 10px',
        borderRadius: '12px',
        marginLeft: 'auto',
        ...style,
      }}
    >
      <Typography variant="caption" component="span">
        {label}
      </Typography>
    </Box>
  );
}
