import * as React from 'react';
import {
  Grid,
  Paper,
  Typography,
  useTheme,
  TableCellProps,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import PageContainer from 'app/components/PageContainer';
import { Field } from 'app/components/DetailsField';
import { BlockTableData } from 'types/block';
import axios from 'axios';
import { getRelativeTime } from 'utils/display-utils';
import useWidth from 'app/hooks/useWidth';
import AddressLink from 'app/components/AddressLink';
import { AddressOverviewCard } from '../XChainPages/XAddressDetail';
import Chip from 'app/components/Chip';
import { useLocation } from 'react-router-dom';

export interface ColumnType {
  name: string;
  label: string;
  field: string;
  minWidth: number;
  align: TableCellProps['align'];
}

const columns: ColumnType[] = [
  {
    name: 'In/Out',
    label: 'In/Out',
    field: 'In/Out',
    minWidth: 140,
    align: 'left',
  },
  {
    name: 'Txn Hash',
    label: 'Txn Hash',
    field: 'Txn Hash',
    minWidth: 140,
    align: 'left',
  },
  {
    name: 'Block',
    label: 'Block',
    field: 'Block',
    align: 'center',
    minWidth: 50,
  },
  {
    name: 'Age',
    label: 'Age',
    field: 'Age',
    align: 'center',
    minWidth: 170,
  },
  {
    name: 'From',
    minWidth: 50,
    label: 'From',
    field: 'From',
    align: 'left',
  },
  {
    minWidth: 50,
    name: 'To',
    label: 'To',
    field: 'To',
    align: 'left',
  },
  {
    minWidth: 50,
    name: 'Value',
    label: 'Value',
    field: 'Value',
    align: 'left',
  },
  {
    minWidth: 50,
    name: 'Txn Fee',
    label: 'Txn Fee',
    field: 'Txn Fee',
    align: 'left',
  },
];

export async function loadBlocksAndTransactions({ address, offset }) {
  return await axios.get(
    `https://magellan.columbus.camino.foundation/v2/cblocks?address=${address}&limit=0&limit=${offset}`,
  );
}

export async function loadBlocks({ address, offset }) {
  let res = (await loadBlocksAndTransactions({ address, offset })).data;
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
      direction: transaction.from === address ? 'out' : 'in',
    };
  });
}

export default function CChainAdress() {
  const theme = useTheme();
  const tableEl = React.useRef<HTMLDivElement>(null);
  const [distanceBottom, setDistanceBottom] = React.useState(0);
  const [hasMore] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState<BlockTableData[]>([]);
  const location = useLocation();
  const loadMore = React.useCallback(() => {
    setLoading(true);
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);
  const loadItems = async () => {
    await new Promise<void>(resolve => {
      loadBlocks({
        address: location.pathname.split('/')[4],
        offset: rows.length + 50,
      }).then(res => {
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
    loadBlocks({ address: location.pathname.split('/')[4], offset: 50 }).then(
      res => {
        setRows(res);
      },
    );
  });
  // React.useEffect(() => {}, [rows]);
  const { isDesktop, isWidescreen } = useWidth();
  return (
    <PageContainer
      pageTitle="C transaction adress"
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
        <AddressOverviewCard balance={987704018599999} />
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
          ></Grid>
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
                  In/Out
                </Typography>
                <Chip
                  label={row.direction}
                  style={{ minWidth: '61px', height: 'min-content' }}
                />
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  Txn Hash
                </Typography>
                <Field type="number" value={row.hash} />
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  Block
                </Typography>
                <AddressLink
                  to={`/`}
                  value={row.number}
                  typographyVariant="body1"
                  truncate={false}
                />
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  Age
                </Typography>
                {getRelativeTime(row.timestamp as number) + ' ago '}
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
                  Value
                </Typography>
                <Field type="gwei" value={row.value} />
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  Transaction Cost
                </Typography>
                <Field type="gwei" value={row.transactionCost} />
              </Grid>
            </Paper>
          );
        })}
    </Grid>
  );
};

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
                <TableCell>
                  <Chip
                    label={row.direction}
                    style={{ minWidth: '61px', height: 'min-content' }}
                  />
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
                >
                  <Field type="string" value={row.hash} />
                </TableCell>

                <TableCell>
                  <Field type="number" value={row.blockNumber} />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" component="span" noWrap={true}>
                    {getRelativeTime(row.timestamp as number) + ' ago '}
                  </Typography>
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
                >
                  <Field type="string" value={row.from} />
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
                >
                  <Field type="string" value={row.to} />
                </TableCell>
                <TableCell>
                  <Field type="gwei" value={row.value} />
                </TableCell>
                <TableCell>
                  <Field type="gwei" value={row.transactionCost} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
