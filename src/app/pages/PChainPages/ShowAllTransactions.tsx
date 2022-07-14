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
import { Fund, getRelativeTime } from 'utils/display-utils';
import useWidth from 'app/hooks/useWidth';
import Chip from 'app/components/Chip';
// import { createTransaction } from 'utils/magellan';
import { XPTransaction, XPTransactionTableData } from 'types/transaction';
import { convertMemo, getInputFunds, getOutputFunds } from 'utils/magellan';
import { MagellanXPTransaction } from 'types/magellan-types';

function getValue(outputTotal?: object, inputTotal?: object): number {
  const output = outputTotal
    ? Object.entries(outputTotal)
        .map(([, value]) => parseInt(value))
        .reduce((pv, cv) => pv + cv, 0)
    : 0;
  const input = inputTotal
    ? Object.entries(inputTotal)
        .map(([, value]) => parseInt(value))
        .reduce((pv, cv) => pv + cv, 0)
    : 0;
  return output - input;
}

export function createTransaction(magellanTransaction: MagellanXPTransaction) {
  return {
    id: magellanTransaction.id,
    timestamp: new Date(Date.parse(magellanTransaction.timestamp)),
    type: magellanTransaction.type,
    from: getInputFunds(magellanTransaction),
    to: getOutputFunds(magellanTransaction),
    fee: magellanTransaction.txFee,
    inputTotals: magellanTransaction.inputTotals,
    outputTotals: magellanTransaction.outputTotals,
    status: 'accepted', //TODO: set dynamically when magellan delivers this information
    memo: convertMemo(magellanTransaction.memo),
  };
}
function mapToTableData(transaction: XPTransaction): XPTransactionTableData {
  return {
    from: transaction.from,
    hash: transaction.id,
    type: transaction.type,
    timestamp: transaction.timestamp,
    to: transaction.to,
    value: getValue(transaction.outputTotals, transaction.inputTotals),
    fee: transaction.fee,
  };
}

export default function XPShowAllTransactions() {
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
      loadTransactions(rows.length).then(res => {
        if (res.length > 0) setRows([...rows, ...res]);
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
    loadTransactions(0).then(res => {
      setRows(res);
    });
  });

  const { isDesktop, isWidescreen } = useWidth();
  return (
    <PageContainer
      pageTitle="X Transactions"
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
              P-Transactions
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
    name: 'hash',
    label: 'Hash',
    field: 'hash',
    align: 'center',
    type: 'hash',
    // detailsLink: transactionDetails,
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
    name: 'timestamp',
    label: 'Timestamp',
    field: 'timestamp',
    align: 'left',
    type: 'timestamp',
  },
  {
    name: 'type',
    label: 'Type',
    field: 'Type',
    align: 'left',
  },
  {
    value: 'fee',
    label: 'Fee',
    align: 'left',
    type: 'currency',
  },
];

export async function loadBlocksAndTransactions(offset: number) {
  return await axios.get(
    `https://magellan.columbus.camino.foundation/v2/transactions?chainID=11111111111111111111111111111111LpoYY&offset=${offset}&limit=50&sort=timestamp-desc`,
  );
}

export function getDisplayAddress(funds: Fund[]): string {
  if (!funds || funds.length === 0) {
    return '';
  }
  if (funds.length > 1) {
    return funds[0].address + ` (+ ${funds.length - 1} more)`;
  }
  return funds[0].address;
}

export async function loadTransactions(offset) {
  let res = (await loadBlocksAndTransactions(offset)).data;
  let newItems = res.transactions.map(item => createTransaction(item));
  return newItems.map(mapToTableData);
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
                align={column.align}
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
                <TableCell
                  align="center"
                  sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
                >
                  <Field type="string" value={row.hash} />
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
                >
                  <Field
                    type="string"
                    value={row.from[0]?.address ? row.from[0]?.address : 'NaN'}
                  />
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
                >
                  <Field
                    type="string"
                    value={row.to[0]?.address ? row.to[0]?.address : 'NaN'}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" component="span" noWrap={true}>
                    {getRelativeTime(row.timestamp as number) + ' ago '}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.type}
                    style={{ minWidth: '61px', height: 'min-content' }}
                  />
                </TableCell>
                <TableCell>
                  <Field type="gwei" value={row.fee} />
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
                  Hash
                </Typography>
                <Field type="string" value={row.hash} />
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  From
                </Typography>
                value={row.to[0]?.address ? row.from[0]?.address : 'NaN'}
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  To
                </Typography>
                value={row.to[0]?.address ? row.to[0]?.address : 'NaN'}
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  Timestamp
                </Typography>
                {getRelativeTime(row.timestamp as number) + ' ago '}
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  Type
                </Typography>
                <Chip
                  label={row.type}
                  style={{
                    minWidth: '61px',
                    height: 'min-content',
                    backgroundColor: '#0F172A',
                  }}
                />
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  Fee
                </Typography>
                <Field type="gwei" value={row.fee} />
              </Grid>
            </Paper>
          );
        })}
    </Grid>
  );
};
