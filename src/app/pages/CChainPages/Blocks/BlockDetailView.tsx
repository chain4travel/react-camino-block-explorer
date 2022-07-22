import React from 'react';
import { Divider, Grid } from '@mui/material';
import { mdiCubeOutline } from '@mdi/js';
import { CBLOCKS } from 'utils/route-paths';
import LoadingWrapper from 'app/components/LoadingWrapper';
import DetailsField from 'app/components/DetailsField';
import OutlinedContainer from 'app/components/OutlinedContainer';
import Icon from '@mdi/react';

export default function BlockDetailView({ blockDetails, loading }) {
  return (
    <LoadingWrapper
      loading={loading}
      failedLoadingMsg="Failed to load the block detail"
    >
      {blockDetails && (
        <OutlinedContainer transparent={false}>
          <DetailsField
            field="Block"
            value={blockDetails['hash']}
            type="string"
            icon={
              <Icon
                path={mdiCubeOutline}
                color="latestList.iconColor"
                style={{ width: '20px', height: '20px' }}
              />
            }
            allowCopy={true}
          />
        </OutlinedContainer>
      )}
      <OutlinedContainer>
        <Grid item container alignItems="center">
          {blockDetails && (
            <>
              <Grid item xs={12}>
                <DetailsField
                  field="Number"
                  value={blockDetails['number']}
                  type="string"
                />
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={12}>
                <DetailsField
                  field="Parent Hash"
                  value={blockDetails['parentHash']}
                  type="string"
                  allowCopy={true}
                  detailsLink={`${CBLOCKS}/${blockDetails.number - 1}`}
                />
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={12}>
                <DetailsField
                  field="Base Gas Fee"
                  value={blockDetails['baseGaseFee']}
                  type="wei"
                />
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={12}>
                <DetailsField
                  field="Fees"
                  value={blockDetails['fees']}
                  type="wei"
                />
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={12}>
                <DetailsField
                  field="Gas Used"
                  value={blockDetails['gasUsed']}
                  type="number"
                />
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={12}>
                <DetailsField
                  field="Timestamp"
                  value={blockDetails['time']}
                  type="timestamp"
                />
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={12}>
                <DetailsField
                  field="Transaction Count"
                  value={blockDetails['transactionsCount']}
                  type="string"
                />
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={12}>
                <DetailsField
                  field="Extra Data"
                  value={blockDetails['extData']}
                  type="hexdata"
                />
              </Grid>
            </>
          )}
        </Grid>
      </OutlinedContainer>
    </LoadingWrapper>
  );
}
