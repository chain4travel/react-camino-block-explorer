import * as React from 'react';
import {
  Grid,
  Paper,
  Typography,
  useTheme,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import PageContainer from 'app/components/PageContainer';
import BackButton from 'app/components/BackButton';
import { Field } from 'app/components/DetailsField';
import { BlockTableData } from 'types/block';
import axios from 'axios';
import { getRelativeTime } from 'utils/display-utils';
import useWidth from 'app/hooks/useWidth';
import AddressLink from 'app/components/AddressLink';
import Chip from 'app/components/Chip';

export default function CShowAllTransactions() {
  const theme = useTheme();
  const tableEl = React.useRef<HTMLDivElement>(null);
  const [distanceBottom, setDistanceBottom] = React.useState(0);
  const [hasMore] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState<BlockTableData[]>([]);

  const loadMore = React.useCallback(() => {
    setLoading(true);
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);
  const loadItems = async () => {
    await new Promise<void>(resolve => {
      loadTransactions(rows[rows.length - 1].number - 1).then(res => {
        setRows([...rows, ...res]);
        setLoading(false);
        resolve();
      });
    });
  };
  const scrollListener = React.useCallback(() => {
    if (tableEl && tableEl.current && tableEl.current) {
      let bottom =
        tableEl?.current?.scrollHeight - tableEl?.current?.clientHeight;
      if (!distanceBottom) {
        // calculate distanceBottom that works for you
        setDistanceBottom(Math.round((bottom / 100) * 20));
      }
      if (
        tableEl.current.scrollTop > bottom - distanceBottom &&
        hasMore &&
        !loading
      ) {
        loadMore();
      }
    }
  }, [hasMore, loadMore, loading, distanceBottom]);
  React.useLayoutEffect(() => {
    const tableRef = tableEl.current;
    tableRef?.addEventListener('scroll', scrollListener);
    return () => {
      tableRef?.removeEventListener('scroll', scrollListener);
    };
  }, [scrollListener]);
  useEffectOnce(() => {
    loadTransactions(NaN as number).then(res => {
      setRows(res);
    });
  });
  const { isDesktop, isWidescreen } = useWidth();
  return (
    <PageContainer
      pageTitle="C Transactions"
      metaContent="chain-overview c-chain"
    >
      <Paper
        variant="outlined"
        square
        sx={{
          minHeight: '680px',
          width: 1,
          backgroundColor: 'primary.dark',
          borderRadius: '12px',
          borderWidth: '1px',
          borderColor: 'primary.light',
          borderStyle: 'solid',

          p: '1.5rem 2rem 1.5rem 2rem',
          [theme.breakpoints.down('md')]: {
            p: '1rem 1.5rem 1rem 1.5rem',
          },
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          sx={{ width: 1, gap: '20px' }}
        >
          <Grid
            item
            container
            alignItems="center"
            sx={{
              gap: '20px',
            }}
          >
            <BackButton />
            <Typography variant="h5" component="h5" fontWeight="fontWeightBold">
              C-Transactions
            </Typography>
          </Grid>
          <TableContainer ref={tableEl} sx={{ height: '750px' }}>
            {isWidescreen || isDesktop ? (
              <CustomTable rows={rows} columns={columns} />
            ) : (
              <SmallSizes rows={rows} />
            )}
          </TableContainer>
        </Grid>
      </Paper>
    </PageContainer>
  );
}

const columns = [
  {
    name: 'blockNumber',
    label: 'Block',
    field: 'blockNumber',
    align: 'center',
    type: 'hash',
    // detailsLink: blockDetails,
  },
  {
    name: 'from',
    label: 'From',
    field: 'from',
    align: 'center',
    type: 'hash',
    // detailsLink: addressDetails,
  },
  {
    name: 'to',
    label: 'To',
    field: 'to',
    align: 'center',
    type: 'hash',
    // detailsLink: addressDetails,
  },
  {
    name: 'hash',
    label: 'Hash',
    field: 'hash',
    align: 'center',
    type: 'hash',
    // detailsLink: transactionDetails,
  },
  {
    name: 'timestamp',
    label: 'Timestamp',
    field: 'timestamp',
    align: 'center',
    type: 'timestamp',
  },
  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'center',
    type: 'status',
  },
  {
    value: 'transactionCost',
    label: 'Transaction Cost',
    field: 'transactionCost',
    align: 'center',
    type: 'currency',
  },
  {
    value: 'value',
    label: 'Value',
    field: 'value',
    align: 'center',
    type: 'currency',
  },
];

export async function loadBlocksAndTransactions(
  startingBlock = NaN,
  endingBlock = NaN,
  transactionId = 0,
  blockCount = 10,
  transactionCount = 0,
) {
  return await axios.get(
    `https://magellan.columbus.camino.foundation/v2/cblocks?limit=${0}&limit=${50}&blockStart=${startingBlock}&blockEnd=${endingBlock}&transactionId=${transactionId}`,
  );
}

export async function loadTransactions(startBlock) {
  let res = (await loadBlocksAndTransactions(startBlock)).data;
  return res.transactions.map(transaction => {
    return {
      blockNumber: parseInt(transaction.block),
      transactionIndex: parseInt(transaction.index),
      from: transaction.from,
      hash: transaction.hash,
      status:
        parseInt(transaction.status) === 1
          ? 'Success'
          : `Failed-${parseInt(transaction.status)}`,
      timestamp: parseInt(transaction.timestamp) * 1000,
      // timestamp: parseInt(transaction.timestamp) * 1000,
      to: transaction.to,
      value: parseInt(transaction.value),
      transactionCost:
        parseInt(transaction.gasUsed) * parseInt(transaction.effectiveGasPrice),
    };
  });
}

const CustomTable = ({ rows, columns }) => {
  return (
    <>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                sx={{ backgroundColor: 'primary.dark', wrap: 'nowrap' }}
                key={column.name}
              >
                <Field type="string" value={column.label} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <AddressLink
                    to={`/c-chain/blocks/${row.blockNumber}`}
                    value={row.blockNumber}
                    typographyVariant="body2"
                    truncate={true}
                  />
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
                >
                  <AddressLink
                    to={`/c-chain/address/${row.from}`}
                    value={row.from}
                    typographyVariant="body2"
                    truncate={true}
                  />
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
                >
                  <AddressLink
                    to={`/c-chain/address/${row.to}`}
                    value={row.to}
                    typographyVariant="body2"
                    truncate={true}
                  />
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
                >
                  <AddressLink
                    to={`/c-chain/transactions/${row.hash}`}
                    value={row.hash}
                    typographyVariant="body2"
                    truncate={true}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" component="span" noWrap={true}>
                    {getRelativeTime(row.timestamp as number) + ' ago '}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    style={{ minWidth: '61px', height: 'min-content' }}
                  />
                </TableCell>
                <TableCell>
                  <Field type="gwei" value={row.transactionCost} />
                </TableCell>
                <TableCell>
                  <Field type="gwei" value={row.value} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

const SmallSizes = ({ rows }) => {
  return (
    <Grid item container alignItems="center">
      {rows.length > 0 &&
        rows.map((row, index) => {
          return (
            <Paper
              key={index}
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
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  Block
                </Typography>
                <AddressLink
                  to={`/`}
                  value={row.blockNumber}
                  typographyVariant="body1"
                  truncate={false}
                />
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  From
                </Typography>
                <Field type="number" value={row.from} />
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  To
                </Typography>
                <Field type="number" value={row.from} />
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  Hash
                </Typography>
                <Field type="number" value={row.hash} />
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  Timestamp
                </Typography>
                {getRelativeTime(row.timestamp as number) + ' ago '}
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  Status
                </Typography>
                <Chip
                  label={row.status}
                  style={{
                    minWidth: '61px',
                    height: 'min-content',
                    backgroundColor: '#0F172A',
                  }}
                />
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  Transaction Cost
                </Typography>
                <Field type="gwei" value={row.transactionCost} />
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  Value
                </Typography>
                <Field type="gwei" value={row.value} />
              </Grid>
            </Paper>
          );
        })}
    </Grid>
  );
};
