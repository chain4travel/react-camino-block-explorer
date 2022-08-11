import React, { FC } from 'react';
import { Divider, Grid } from '@mui/material';
import { mdiCubeOutline } from '@mdi/js';
import { CBLOCKS } from 'utils/route-paths';
import { BlockDetail } from 'types/block';
import { Status } from 'types';
import LoadingWrapper from 'app/components/LoadingWrapper';
import DetailsField from 'app/components/DetailsField';
import OutlinedContainer from 'app/components/OutlinedContainer';
import CopyTitleCard from 'app/components/CopyTitleCard';

interface BlockDetailViewProps {
  blockDetails: BlockDetail | undefined;
  loading: Status;
}

const BlockDetailView: FC<BlockDetailViewProps> = ({
  blockDetails,
  loading,
}) => {
  return (
    <LoadingWrapper
      loading={loading}
      failedLoadingMsg="Failed to load the block detail"
    >
      {blockDetails && (
        <>
          <CopyTitleCard
            label="Block"
            value={blockDetails['hash']}
            icon={mdiCubeOutline}
          />
          <OutlinedContainer>
            <Grid item container alignItems="center">
              <Grid item xs={12}>
                <DetailsField
                  field="Number"
                  value={blockDetails['number']}
                  type="string"
                  style={{ padding: '1rem' }}
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
                  style={{ padding: '1rem' }}
                />
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={12}>
                <DetailsField
                  field="Base Gas Fee"
                  value={blockDetails['baseGaseFee']}
                  type="wei"
                  style={{ padding: '1rem' }}
                />
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={12}>
                <DetailsField
                  field="Fees"
                  value={blockDetails['fees']}
                  type="wei"
                  style={{ padding: '1rem' }}
                />
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={12}>
                <DetailsField
                  field="Gas Used"
                  value={blockDetails['gasUsed']}
                  type="number"
                  style={{ padding: '1rem' }}
                />
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={12}>
                <DetailsField
                  field="Timestamp"
                  value={blockDetails['time']}
                  type="timestamp"
                  style={{ padding: '1rem' }}
                />
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={12}>
                <DetailsField
                  field="Transaction Count"
                  value={blockDetails['transactionsCount']}
                  type="string"
                  style={{ padding: '1rem' }}
                />
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={12}>
                <DetailsField
                  field="Extra Data"
                  value={blockDetails['extData']}
                  type="hexdata"
                  style={{ padding: '1rem' }}
                />
              </Grid>
            </Grid>
          </OutlinedContainer>
        </>
      )}
    </LoadingWrapper>
  );
};

export default BlockDetailView;
