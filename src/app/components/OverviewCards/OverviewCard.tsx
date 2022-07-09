import React, { FC } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { status } from 'types';

type OverviewCardProps = {
  title: string;
  value: string;
  loading: string;
  subValue?: string;
};

export const OverviewCard: FC<OverviewCardProps> = ({
  title,
  value,
  loading,
  subValue,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        flex: 1,
        minHeight: '150px',
        backgroundColor: 'overviewCard.background',
        textAlign: 'center',
        p: '1rem 2rem',
        borderRadius: '12px',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: '0',
        }}
      >
        <Typography
          variant="h6"
          component="h6"
          sx={{ color: 'overviewCard.title' }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoadingWrapper loading={loading} failedLoadingMsg="-">
            <Typography
              variant="h4"
              component="h4"
              fontWeight="fontWeightBold"
              sx={{ color: 'overviewCard.contrastText' }}
            >
              {value}
            </Typography>
            {subValue && (
              <Typography
                variant="h6"
                component="h6"
                sx={{ color: 'overviewCard.subValue' }}
              >
                {subValue}
              </Typography>
            )}
          </LoadingWrapper>
        </Box>
      </CardContent>
    </Card>
  );
};

export const LoadingWrapper = ({ loading, failedLoadingMsg, children }) => {
  if (loading === status.SUCCEEDED) {
    return <>{children}</>;
  } else if (loading === status.FAILED) {
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
