import React from 'react';
import { Divider } from '@mui/material';

export default function XPItemDivider({
  index,
  max,
  children,
}: {
  index: number;
  max: number;
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {index < max && (
        <Divider variant="fullWidth" sx={{ marginBottom: '1rem' }} />
      )}
    </>
  );
}
