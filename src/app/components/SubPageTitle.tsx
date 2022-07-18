import React from 'react';
import BackButton from 'app/components/BackButton';
import { Box, Typography } from '@mui/material';

const SubPageTitle = ({
  title,
  style,
  children,
}: {
  title: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        ...style,
      }}
    >
      <BackButton />
      <Typography variant="h5" component="h5" fontWeight="fontWeightBold">
        {title}
      </Typography>
      <Box>{children}</Box>
    </Box>
  );
};

export default SubPageTitle;
