import React from 'react';
import { Typography, Grid } from '@mui/material';
import CopyToClipboardButton from 'app/components/CopyToClipboardButton';
import { mdiFileDocumentOutline } from '@mdi/js';
import Icon from '@mdi/react';
import OutlinedContainer from 'app/components/OutlinedContainer';

export default function CopyAddressTitle({
  showAddressLabel,
  value,
}: {
  showAddressLabel: boolean;
  value: string;
}) {
  return (
    <OutlinedContainer transparent={false}>
      <Grid
        container
        columnSpacing={2}
        sx={{ display: 'flex', alignItems: 'flex-end', padding: '15px' }}
        wrap="nowrap"
      >
        {showAddressLabel && (
          <Grid
            container
            item
            xs="auto"
            direction="row"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Icon
              path={mdiFileDocumentOutline}
              size={1}
              color="latestList.iconColor"
            />
            <Typography
              variant="h6"
              component="h6"
              color="textPrimary"
              fontWeight="fontWeightBold"
              sx={{ marginLeft: '10px' }}
            >
              Address
            </Typography>
          </Grid>
        )}
        <Grid
          item
          xs
          zeroMinWidth
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <Typography
            variant="body1"
            component="span"
            fontWeight="fontWeightBold"
            color="latestList.timestamp"
            noWrap={true}
            sx={{
              display: 'inline-block',
              width: '100%',
            }}
          >
            {value}
          </Typography>
        </Grid>
        <Grid item xs="auto">
          <CopyToClipboardButton value={value} />
        </Grid>
      </Grid>
    </OutlinedContainer>
  );
}
