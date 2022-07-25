import React from 'react';
import useWidth from 'app/hooks/useWidth';
import {
  Grid,
  Paper,
  TableCell,
  TableRow,
  Typography,
  Chip,
} from '@mui/material';
import { Field } from 'app/components/DetailsField';
import { getRelativeTime } from 'utils/display-utils';
import { CADDRESS, CBLOCKS } from 'utils/route-paths';
import AddressLink from 'app/components/AddressLink';

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
          Block
        </Typography>
        <AddressLink
          to={`/`}
          value={transaction.blockNumber}
          typographyVariant="body1"
          truncate={false}
        />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          From
        </Typography>
        <Field type="number" value={transaction.from} />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          To
        </Typography>
        <Field type="number" value={transaction.from} />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Hash
        </Typography>
        <Field type="number" value={transaction.hash} />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Timestamp
        </Typography>
        {getRelativeTime(transaction.timestamp as number) + ' ago '}
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Status
        </Typography>
        <Chip
          label={transaction.status}
          size="small"
          style={{ minWidth: '61px', height: 'min-content' }}
        />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Transaction Cost
        </Typography>
        <Field type="gwei" value={transaction.transactionCost} />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Value
        </Typography>
        <Field type="gwei" value={transaction.value} />
      </Grid>
    </>
  );
};

const CustomRow = ({ transaction }) => {
  return (
    <>
      <TableCell>
        <AddressLink
          to={`${CBLOCKS}/${transaction.blockNumber}`}
          value={transaction.blockNumber}
          typographyVariant="body2"
          truncate={true}
        />
      </TableCell>
      <TableCell
        align="center"
        sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
      >
        <AddressLink
          to={`${CADDRESS}/${transaction.from}`}
          value={transaction.from}
          typographyVariant="body2"
          truncate={true}
        />
      </TableCell>
      <TableCell
        align="center"
        sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
      >
        <AddressLink
          to={`${CADDRESS}/${transaction.to}`}
          value={transaction.to}
          typographyVariant="body2"
          truncate={true}
        />
      </TableCell>
      <TableCell
        align="center"
        sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
      >
        <AddressLink
          to={`${transaction.hash}`}
          value={transaction.hash}
          typographyVariant="body2"
          truncate={true}
        />
      </TableCell>
      <TableCell>
        <Typography variant="body2" component="span" noWrap={true}>
          {getRelativeTime(transaction.timestamp as number) + ' ago '}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip
          label={transaction.status}
          size="small"
          style={{ minWidth: '61px', height: 'min-content' }}
        />
      </TableCell>
      <TableCell>
        <Field type="gwei" value={transaction.transactionCost} />
      </TableCell>
      <TableCell>
        <Field type="gwei" value={transaction.value} />
      </TableCell>
    </>
  );
};
