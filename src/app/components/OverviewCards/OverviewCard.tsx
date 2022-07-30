import React, { FC } from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import { Status } from 'types';
import LoadingWrapper from 'app/components/LoadingWrapper';

type OverviewCardProps = {
  title: string;
  value: string;
  loading: Status;
  subValue?: string;
};

const OverviewCard: FC<OverviewCardProps> = ({
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
        backgroundColor: 'card.background',
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
        <Typography variant="h6" component="span" sx={{ color: 'card.title' }}>
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
              component="span"
              fontWeight="fontWeightBold"
              sx={{ color: 'card.contrastText' }}
            >
              {value}
            </Typography>
            {subValue && (
              <Typography
                variant="h6"
                component="span"
                sx={{ color: 'card.subValue' }}
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

export default OverviewCard;
