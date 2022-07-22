import {
  Grid,
  Paper,
  TableCell,
  TableRow,
  Typography,
  Chip,
} from '@mui/material';
import AddressLink from 'app/components/AddressLink';
import { Field } from 'app/components/DetailsField';
import useWidth from 'app/hooks/useWidth';
import React from 'react';
import { getRelativeTime } from 'utils/display-utils';
import { getAddressLink } from 'utils/route-utils';
import { ChainType } from 'utils/types/chain-type';

interface Props {
  transaction: any;
}
export type Ref = any;

const Transaction = React.forwardRef<Ref, Props>((props, ref) => {
  const transactionBody = <CustomRow transaction={props.transaction} />;

  const { isDesktop, isWidescreen } = useWidth();
  let content;
  if (isDesktop || isWidescreen)
    content = ref ? (
      <TableRow ref={ref}>{transactionBody}</TableRow>
    ) : (
      <TableRow>{transactionBody}</TableRow>
    );
  else
    content = ref ? (
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
        ref={ref}
      >
        <GridItem transaction={props.transaction} />
      </Paper>
    ) : (
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
        <GridItem transaction={props.transaction} />
      </Paper>
    );
  return content;
});

export default Transaction;

const GridItem = ({ transaction }) => {
  return (
    <>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Hash
        </Typography>
        <AddressLink
          to={`/x-chain/transactions/${transaction.hash}`}
          value={transaction.hash}
          typographyVariant="body1"
          truncate={true}
        />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          From
        </Typography>
        {transaction.from[0]?.address ? (
          <AddressLink
            to={`/x-chain/address/${getAddressLink(
              'x-chain' as ChainType,
              transaction.from[0]?.address,
            )}`}
            value={transaction.from[0]?.address}
            typographyVariant="body1"
            truncate={true}
          />
        ) : (
          '-'
        )}
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          To
        </Typography>
        {transaction.to[0]?.address ? (
          <AddressLink
            to={`/x-chain/address/${getAddressLink(
              'x-chain' as ChainType,
              transaction.to[0]?.address,
            )}`}
            value={transaction.to[0]?.address}
            typographyVariant="body1"
            truncate={true}
          />
        ) : (
          '-'
        )}
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Timestamp
        </Typography>
        {getRelativeTime(transaction.timestamp as number) + ' ago '}
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Type
        </Typography>
        <Chip
          label={transaction.type}
          size="small"
          style={{
            minWidth: '61px',
            height: 'min-content',
            fontSize: '11px',
          }}
        />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Fee
        </Typography>
        <Field type="gwei" value={transaction.fee} />
      </Grid>
    </>
  );
};

const CustomRow = ({ transaction }) => {
  return (
    <>
      <TableCell
        align="center"
        sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
      >
        <AddressLink
          to={`/x-chain/transactions/${transaction.hash}`}
          value={transaction.hash}
          typographyVariant="body1"
          truncate={true}
        />
      </TableCell>
      <TableCell
        align="center"
        sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
      >
        {transaction.from[0]?.address ? (
          <AddressLink
            to={`/x-chain/address/${getAddressLink(
              'x-chain' as ChainType,
              transaction.from[0]?.address,
            )}`}
            value={transaction.from[0]?.address}
            typographyVariant="body1"
            truncate={true}
          />
        ) : (
          '-'
        )}
      </TableCell>
      <TableCell
        align="center"
        sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
      >
        {transaction.to[0]?.address ? (
          <AddressLink
            to={`/x-chain/address/${getAddressLink(
              'x-chain' as ChainType,
              transaction.to[0]?.address,
            )}`}
            value={transaction.to[0]?.address}
            typographyVariant="body1"
            truncate={true}
          />
        ) : (
          '-'
        )}
      </TableCell>
      <TableCell align="center">
        <Typography variant="body2" component="span" noWrap={true}>
          {getRelativeTime(transaction.timestamp as number) + ' ago '}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Chip
          label={transaction.type}
          size="small"
          style={{ minWidth: '61px', height: 'min-content', fontSize: '11px' }}
        />
      </TableCell>
      <TableCell align="left">
        <Field type="gwei" value={transaction.fee} />
      </TableCell>
    </>
  );
};
