import * as React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { getRelativeTime } from 'utils/display-utils';
import { Field } from 'app/components/DetailsField';
import { ValidatorType } from 'types/store';
import Chip from '@mui/material/Chip';

export const GridViewItem = ({ validator }: { validator: ValidatorType }) => {
  return (
    <Paper
      sx={{
        width: 1,
        marginBottom: '1rem',
        padding: '15px',
        gap: '10px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'primary.light',
        backgroundImage: 'none',
      }}
    >
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Status
        </Typography>
        <Chip
          label={validator.status}
          sx={{
            borderRadius: '7px',
            color: 'grey.900',
            backgroundColor:
              validator.status === 'Connected' ? 'success.main' : 'error.main',
          }}
        />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          NodeID
        </Typography>
        <Field type="string" value={validator.nodeID} />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          StartTime
        </Typography>
        {getRelativeTime(validator.startTime) + ' ago '}
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          EndTime
        </Typography>
        {getRelativeTime(validator.endTime) + ' ago '}
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          UpTime
        </Typography>
        <Field type="string" value={validator.uptime} />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          txID
        </Typography>
        <Field type="string" value={validator.txID} />
      </Grid>
    </Paper>
  );
};
