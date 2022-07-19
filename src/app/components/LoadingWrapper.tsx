import React from 'react';
import { Typography, CircularProgress } from '@mui/material';
import { Status } from 'types';

interface LoadingWrapperProps {
  loading: Status;
  children: React.ReactNode;
  failedLoadingMsg?: string;
}

export default function LoadingWrapper({
  loading,
  failedLoadingMsg,
  children,
}: LoadingWrapperProps) {
  if (loading === Status.SUCCEEDED) {
    return <>{children}</>;
  } else if (loading === Status.FAILED) {
    return (
      <Typography
        variant="h4"
        component="h4"
        fontWeight="fontWeightBold"
        sx={{ color: 'card.subValue' }}
      >
        {failedLoadingMsg}
      </Typography>
    );
  } else {
    return <CircularProgress color="secondary" />;
  }
}
