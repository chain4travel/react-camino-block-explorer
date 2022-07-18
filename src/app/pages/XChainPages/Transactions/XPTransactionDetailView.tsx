import * as React from 'react';
import { Divider, Grid } from '@mui/material';
import OutlinedContainer from 'app/components/OutlinedContainer';
import DetailsField from 'app/components/DetailsField';
import { InputOutputSection } from '../XAddressDetail';

function TransactionDetailView({ detailTr, inputs, outputs }) {
  return (
    <>
      {detailTr && (
        <OutlinedContainer>
          <Grid item container alignItems="center" justifyContent="center">
            <Grid item xs={12}>
              <DetailsField
                field="Status"
                value={detailTr['status']}
                type="string"
              />
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item xs={12}>
              <DetailsField
                field="Type"
                value={detailTr['type']}
                type="ctxtype"
              />
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item xs={12}>
              <DetailsField
                field="Timestamp"
                value={detailTr['timestamp'].toString()}
                type="timestamp"
                tooltip="date"
              />
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item xs={12}>
              <DetailsField field="Fee" value={detailTr['fee']} type="wei" />
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item xs={12}>
              <DetailsField
                field="Memo"
                value={detailTr['memo']}
                type="string"
              />
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                item
                xs
                md={8}
                spacing={2}
                sx={{ maxWidth: 'unset' }}
              >
                <InputOutputSection inputs={inputs} outputs={outputs} />
              </Grid>
            </Grid>
          </Grid>
        </OutlinedContainer>
      )}
    </>
  );
}

export default React.memo(TransactionDetailView);
