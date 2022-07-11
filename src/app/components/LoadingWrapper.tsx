import React from 'react';
import { Typography, CircularProgress } from '@mui/material';

export const LoadingWrapper = ({ loading, failedLoadingMsg, children }) => {
  if (loading === 'succeeded') {
    return <>{children}</>;
  } else if (loading === 'failed') {
    return (
      <Typography
        variant="h4"
        component="h4"
        fontWeight="fontWeightBold"
        sx={{ color: 'overviewCard.subValue' }}
      >
        {failedLoadingMsg}
      </Typography>
    );
  } else {
    return <CircularProgress color="secondary" />;
  }
};
