import * as React from 'react';
import { Grid, Divider, useMediaQuery } from '@mui/material';
import { CamAmount } from '../CamAmount';
import { MagellanXPInput, MagellanXPOutput } from 'types/magellan-types';
import { getAddressLink, getTransactionDetailsPath } from 'utils/route-utils';
import { ChainType } from 'utils/types/chain-type';
import RelativeTime from 'app/components/RelativeTime';
import AddressLink from '../AddressLink';
import BlockTxIcon from './BlockTxIcon';
import Chip from '../Chip';

export default function XPTransactionItem({ chainType, data }) {
  return (
    <Grid container columnSpacing={{ md: 2 }} rowSpacing={{ xs: 2, md: 0 }}>
      <Grid container item xs={12} md={4}>
        <XPTransactionFirstSection
          id={data.id}
          timestamp={data.timestamp}
          type={data.type}
          to={getTransactionDetailsPath(data.id)}
        />
      </Grid>
      <Grid container item xs={12} md={8} columnSpacing={2}>
        <Grid item xs={12} lg={8}>
          <XPTransactionSecondSection
            chainType={chainType}
            type="From"
            data={data.from}
          />
          <XPTransactionSecondSection
            chainType={chainType}
            type="To"
            data={data.to}
            from={data.from}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <XPTransactionThirdSection value={data.fee} />
        </Grid>
      </Grid>
    </Grid>
  );
}

const XPTransactionFirstSection = ({
  id,
  timestamp,
  type,
  to,
}: {
  id: string;
  timestamp: number;
  type: string;
  to: string;
}) => {
  const isMobile = useMediaQuery('@media (max-width:600px)');
  return (
    <>
      {!isMobile && (
        <Grid item xs={2} md={3} lg={2}>
          <BlockTxIcon iconType="transaction" />
        </Grid>
      )}
      <Grid item xs={8} sm={6}>
        <AddressLink
          to={to}
          value={id}
          typographyVariant="body1"
          truncate={true}
        />
        <RelativeTime value={timestamp} variant="subtitle2" />
      </Grid>
      <Grid item xs={4} md={3} lg={4}>
        <Chip label={type} style={{ minWidth: '61px', marginLeft: 'auto' }} />
      </Grid>
    </>
  );
};

const XPTransactionSecondSection = ({
  type,
  from,
  data,
  chainType,
}: {
  type: string;
  data: MagellanXPInput[] | MagellanXPOutput[];
  from?: MagellanXPOutput;
  chainType: ChainType;
}) => {
  const isMobile = useMediaQuery('@media (max-width:600px)');
  return (
    <div style={{ width: '100%', padding: '0rem 0rem .5rem 0rem' }}>
      <Grid container direction="row" style={{ width: '100%' }}>
        <Grid item xs={3} sm={2}>
          {type}
        </Grid>
        <Grid item xs={9} sm={10}>
          {data.map((tx, index) => (
            <Grid
              container
              style={{ padding: '0rem 0rem .5rem 0rem' }}
              key={index}
            >
              <Grid item xs={12} sm={6} xl={7}>
                <AddressLink
                  to={getAddressLink(chainType, tx.address)}
                  value={tx.address}
                  typographyVariant="body1"
                  truncate={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} xl={5}>
                <CamAmount
                  amount={tx.value}
                  currency="nCam"
                  style={{
                    marginLeft: !isMobile ? 'auto' : '',
                    color:
                      from &&
                      from[0] &&
                      tx.address === from[0].address &&
                      '#616161',
                  }}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {type === 'From' && <Divider variant="fullWidth" />}
    </div>
  );
};

const XPTransactionThirdSection = ({ value }: { value: number }) => {
  const isMobile = useMediaQuery('@media (max-width:1199px)');
  return (
    <>
      {isMobile && (
        <Divider
          variant="fullWidth"
          sx={{ width: '100%', marginBottom: '1rem' }}
        />
      )}
      <Grid container>
        {isMobile && (
          <Grid item xs={6} sx={{ marginBottom: '16px' }}>
            Fees
          </Grid>
        )}
        <Grid item xs={6} lg={12}>
          <CamAmount
            amount={value}
            currency="nCam"
            style={{ marginLeft: 'auto' }}
          />
        </Grid>
      </Grid>
    </>
  );
};
