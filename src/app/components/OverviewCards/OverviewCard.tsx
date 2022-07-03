import React, { FC } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';

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

// create a component that renders a the children if loading props is succeeded
// if loading props is failed, render a Typography Failed
// if loading props is loading, render a CircularProgress

const LoadingWrapper = ({ loading, failedLoadingMsg, children }) => {
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
