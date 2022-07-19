import React from 'react';
import { Grid } from '@mui/material';
import RowRadioButtonsGroup from './RowRadioButtonsGroup';
import GlobalReloadButton from './GlobalReloadButton';

export default function DataControllers() {
  return (
    <Grid container spacing={{ xs: 1, md: 1 }}>
      <Grid item xs>
        <RowRadioButtonsGroup />
      </Grid>
      <Grid item xs="auto" sm={3}>
        <GlobalReloadButton style={{ display: 'flex', marginLeft: 'auto' }} />
      </Grid>
    </Grid>
  );
}
