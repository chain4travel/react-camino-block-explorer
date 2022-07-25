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
import { BlockType } from 'types/block';
import { getRelativeTime } from 'utils/display-utils';
import { CADDRESSPATH, CTRANSACTIONS, CBLOCKS } from 'utils/route-paths';

interface Props {
  transaction: BlockType;
}
export type Ref = any;

const Address = React.forwardRef<Ref, Props>((props, ref) => {
  const addressBody = <CustomRow transaction={props.transaction} />;
  const { isDesktop, isWidescreen } = useWidth();
  let content;
  if (isDesktop || isWidescreen)
    content = ref ? (
      <TableRow ref={ref}>{addressBody}</TableRow>
    ) : (
      <TableRow>{addressBody}</TableRow>
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

export default Address;

//CustomRow
const CustomRow = ({ transaction }) => {
  return (
    <>
      <TableCell>
        <Chip
          label={transaction.direction}
          size="small"
          style={{ minWidth: '61px', height: 'min-content' }}
        />
      </TableCell>
      <TableCell
        align="left"
        sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
      >
        <AddressLink
          to={`${CTRANSACTIONS}/${transaction.hash}`}
          value={transaction.hash}
          typographyVariant="body2"
          truncate={true}
        />
      </TableCell>
      <TableCell>
        <AddressLink
          to={`${CBLOCKS}/${transaction.blockNumber}`}
          value={transaction.blockNumber}
          typographyVariant="body2"
          truncate={true}
        />
      </TableCell>
      <TableCell>
        <Typography variant="body2" component="span" noWrap={true}>
          {getRelativeTime(transaction.timestamp as number) + ' ago '}
        </Typography>
      </TableCell>
      <TableCell
        align="left"
        sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
      >
        <AddressLink
          to={`${CADDRESSPATH}/${transaction.from}`}
          value={transaction.from}
          typographyVariant="body2"
          truncate={true}
        />
      </TableCell>
      <TableCell
        align="left"
        sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
      >
        <AddressLink
          to={`${CADDRESSPATH}/${transaction.to}`}
          value={transaction.to}
          typographyVariant="body2"
          truncate={true}
        />
      </TableCell>
      <TableCell>
        <Field type="gwei" value={transaction.value} />
      </TableCell>
      <TableCell>
        <Field type="gwei" value={transaction.transactionCost} />
      </TableCell>
    </>
  );
};

const GridItem = ({ transaction }) => {
  return (
    <>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          In/Out
        </Typography>
        <Chip
          label={transaction.direction}
          size="small"
          style={{ minWidth: '61px', height: 'min-content', fontSize: '12px' }}
        />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Txn Hash
        </Typography>
        <AddressLink
          to={`${CTRANSACTIONS}/${transaction.hash}`}
          value={transaction.hash}
          typographyVariant="body2"
          truncate={true}
        />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Block
        </Typography>
        <AddressLink
          to={`${CBLOCKS}/${transaction.blockNumber}`}
          value={transaction.blockNumber}
          typographyVariant="body2"
          truncate={true}
        />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Age
        </Typography>
        {getRelativeTime(transaction.timestamp as number) + ' ago '}
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          From
        </Typography>
        <AddressLink
          to={`${CADDRESSPATH}/${transaction.from}`}
          value={transaction.from}
          typographyVariant="body2"
          truncate={true}
        />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          To
        </Typography>
        <AddressLink
          to={`${CADDRESSPATH}/${transaction.to}`}
          value={transaction.to}
          typographyVariant="body2"
          truncate={true}
        />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Value
        </Typography>
        <Field type="gwei" value={transaction.value} />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Transaction Cost
        </Typography>
        <Field type="gwei" value={transaction.transactionCost} />
      </Grid>
    </>
  );
};
