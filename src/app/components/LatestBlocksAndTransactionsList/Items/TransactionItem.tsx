import React, { FC } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { mdiTransfer } from '@mdi/js';
import { CamAmount } from '../../CamAmount';
import { CTransaction } from 'types/transaction';
import Icon from '@mdi/react';
import AddressLink from '../../AddressLink';
import RelativeTime from '../../RelativeTime';
import useWidth from 'app/hooks/useWidth';

interface TransactionItemProps {
  transaction: CTransaction;
  to: string;
}

const TransactionItem: FC<TransactionItemProps> = ({ transaction, to }) => {
  const { isMobile, isTablet } = useWidth();
  return (
    <Grid
      container
      rowSpacing={{ xs: 1, md: 2 }}
      justifyContent="space-between"
      sx={{ padding: '0.5rem 0rem 0.5rem 0rem' }}
    >
      {!isMobile && !isTablet && (
        <Grid item xs="auto">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'latestList.iconBackground',
              borderRadius: '12px',
              minWidth: '50px',
              minHeight: '50px',
              width: '50px',
              height: '50px',
            }}
          >
            <Icon path={mdiTransfer} size={1} color="latestList.iconColor" />
          </Box>
        </Grid>
      )}
      <Grid item xs={12} md={3} justifyContent="flex-start">
        <AddressLink
          to={`${to}/${transaction.hash}`}
          value={transaction.hash}
          typographyVariant="body1"
          truncate={true}
        />
        <RelativeTime value={transaction.timestamp} variant="subtitle2" />
      </Grid>
      <Grid item xs={12} md={4} xl={5}>
        <Grid container direction="row">
          <Grid item xs={2} md={4} xl={3}>
            <Typography variant="subtitle2">From</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <AddressLink
              to={`address/${transaction.from}`}
              value={transaction.from}
              typographyVariant="body1"
              truncate={true}
            />
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item xs={2} md={4} xl={3}>
            <Typography variant="subtitle2">To</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <AddressLink
              to={`address/${transaction.to}`}
              value={transaction.to}
              typographyVariant="body1"
              truncate={true}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={3}
        xl="auto"
        alignItems="center"
        justifyContent={isMobile && isTablet ? 'flex-start' : 'flex-end'}
      >
        <CamAmount amount={transaction.transactionCost} />
      </Grid>
    </Grid>
  );
};

export default TransactionItem;
