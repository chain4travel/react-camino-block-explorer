import * as React from 'react';
import { Typography, Tooltip } from '@mui/material';
import { getRelativeTime } from 'utils/display-utils';

export default function RelativeTime({
  variant,
  value,
}: {
  variant?: 'cam' | 'gas';
  value: number;
}) {
  const date = new Date(value);
  return (
    <Tooltip title={date.toLocaleString('en-US')}>
      <Typography variant="subtitle2" color="latestList.timestamp">
        {getRelativeTime(value) + ' ago'}
      </Typography>
    </Tooltip>
  );
}
