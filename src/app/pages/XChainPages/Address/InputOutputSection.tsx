import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import DetailsField from './DetailsField';

export const InputOutputSection = ({ inputs, outputs }) => {
  return (
    <>
      <Grid
        container
        item
        xs={12}
        lg={6}
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        {inputs.map((item, index) => {
          return (
            <Grid key={index} item xs>
              <InputCard
                address={item.address}
                signature={item.signature}
                value={item.value}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid
        container
        item
        xs={12}
        lg={6}
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        {outputs.map((item, index) => {
          return (
            <Grid key={index} item xs>
              <OutputCard address={item.address} value={item.value} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

const InputCard = ({ address, signature, value }) => {
  return (
    <Paper
      sx={{
        padding: '15px',
        gap: '10px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'primary.light',
        backgroundImage: 'none',
      }}
    >
      <Typography
        variant="body1"
        component="h5"
        fontWeight="fontWeightBold"
        sx={{ marginBottom: '15px' }}
      >
        Input
      </Typography>
      <DetailsField
        field="From"
        value={address}
        type="string"
        tooltip="Fee"
        allowCopy={true}
      />
      <DetailsField
        field="Signature"
        value={signature}
        type="string"
        tooltip="Fee"
      />
      <DetailsField field="Value" value={value} type="gwei" tooltip="Fee" />
    </Paper>
  );
};

const OutputCard = ({ address, value }) => {
  return (
    <Paper
      sx={{
        padding: '15px',
        gap: '10px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'primary.light',
        backgroundImage: 'none',
      }}
    >
      <Typography
        variant="body1"
        component="h5"
        fontWeight="fontWeightBold"
        sx={{ marginBottom: '15px' }}
      >
        Output
      </Typography>
      <DetailsField
        field="To"
        value={address}
        type="string"
        tooltip="Fee"
        allowCopy={true}
      />
      <DetailsField field="Value" value={value} type="gwei" tooltip="Fee" />
    </Paper>
  );
};
