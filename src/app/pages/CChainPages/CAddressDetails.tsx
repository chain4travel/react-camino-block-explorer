import * as React from 'react';
import {
  Paper,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
} from '@mui/material';
import PageContainer from 'app/components/PageContainer';
import CopyAddressTitle from 'app/components/CopyAddressTitle';
import TabsHeader from 'app/components/TabComponent/TabsHeader';
import TabPanel from 'app/components/TabComponent/TabPanel';
import Chip from 'app/components/Chip';
import useWidth from 'app/hooks/useWidth';
import { Field } from 'app/components/DetailsField';
import { getRelativeTime } from 'utils/display-utils';
import { BlockTableData } from 'types/block';
import BackButton from 'app/components/BackButton';
import axios from 'axios';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import AddressLink from 'app/components/AddressLink';
import { AddressOverviewCard } from '../XChainPages/XAddressDetail';
import { useLocation } from 'react-router-dom';

const tabOptions = [
  {
    label: 'Transactions',
    value: 'transactions',
  },
  {
    label: 'Blocks',
    value: 'blocks',
  },
];

export default function CAddressDetails() {
  // getting the address from the url by getting what comes after the last slash
  const address = window.location.pathname.split('/').pop() as string;
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <PageContainer
      pageTitle="C Address Detail"
      metaContent="chain-overview c-chain"
    >
      <PageTitle title="Address Detail" />
      <CopyAddressTitle showAddressLabel={true} value={address} />
      <Paper square variant="outlined" sx={{ backgroundColor: 'primary.dark' }}>
        <TabsHeader
          tabValue={value}
          changeAction={handleChange}
          tabOptions={tabOptions}
        >
          <Panels value={value} />
        </TabsHeader>
      </Paper>
    </PageContainer>
  );
}

////////////////////////////////////////////////////////////////////////////

const PageTitle = ({ title }) => {
  return (
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
        {title}
      </Typography>
    </Grid>
  );
};

////////////////////////////////////////////////////////////////////////////

const Panels = ({ value }: { value: number }) => {
  const { isDesktop, isWidescreen } = useWidth();
  const tableEl = React.useRef<HTMLDivElement>(null);
  const [rows, setRows] = React.useState<BlockTableData[]>([]);
  const [distanceBottom, setDistanceBottom] = React.useState(0);
  const [address, setAddress] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);
  const location = useLocation();
  const loadMore = React.useCallback(() => {
    setLoading(true);
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);
  const loadItems = async () => {
    await new Promise<void>(resolve => {
      loadBlocks({
        address: location.pathname.split('/')[3],
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
      if (tableEl.current.scrollTop > bottom - distanceBottom && !loading) {
        loadMore();
      }
    }
  }, [loadMore, loading, distanceBottom]);
  React.useLayoutEffect(() => {
    const tableRef = tableEl.current;
    tableRef?.addEventListener('scroll', scrollListener);
    return () => {
      tableRef?.removeEventListener('scroll', scrollListener);
    };
  }, [scrollListener]);
  useEffectOnce(() => {
    loadBlocks({ address: location.pathname.split('/')[3], offset: 50 }).then(
      res => {
        setAddress(location.pathname.split('/')[3]);
        setRows(res);
      },
    );
  });

  return (
    <>
      <TabPanel value={value} index={0} style={{ padding: '0px' }}>
        {/* loop on the transactions */}
        <Grid container>
          <TableContainer ref={tableEl} sx={{ height: '700px' }}>
            {isWidescreen || isDesktop ? (
              <CustomTable address={address} rows={rows} columns={columns} />
            ) : (
              <SmallSizes rows={rows} />
            )}
          </TableContainer>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
    </>
  );
};

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

export function CChainAdress() {
  const theme = useTheme();
  const tableEl = React.useRef<HTMLDivElement>(null);
  const [distanceBottom, setDistanceBottom] = React.useState(0);
  const [address, setAddress] = React.useState<string>();
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
        address: location.pathname.split('/')[3],
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
      if (tableEl.current.scrollTop > bottom - distanceBottom && !loading) {
        loadMore();
      }
    }
  }, [loadMore, loading, distanceBottom]);
  React.useLayoutEffect(() => {
    const tableRef = tableEl.current;
    tableRef?.addEventListener('scroll', scrollListener);
    return () => {
      tableRef?.removeEventListener('scroll', scrollListener);
    };
  }, [scrollListener]);
  useEffectOnce(() => {
    loadBlocks({ address: location.pathname.split('/')[3], offset: 50 }).then(
      res => {
        setAddress(location.pathname.split('/')[3]);
        setRows(res);
      },
    );
  });
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
          <TableContainer ref={tableEl} sx={{ height: '700px' }}>
            {isWidescreen || isDesktop ? (
              <CustomTable address={address} rows={rows} columns={columns} />
            ) : (
              <SmallSizes rows={rows} />
            )}
          </TableContainer>
        </Grid>
      </Paper>
    </PageContainer>
  );
}

////////////////////////////////////////////////////////////////////////////

const SmallSizes = ({ rows }) => {
  return (
    <Grid item container alignItems="center" sx={{ p: 3 }}>
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
                <AddressLink
                  to={`/c-chain/transactions/${row.hash}`}
                  value={row.hash}
                  typographyVariant="body2"
                  truncate={true}
                />
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  Block
                </Typography>
                <AddressLink
                  to={`/c-chain/blocks/${row.blockNumber}`}
                  value={row.blockNumber}
                  typographyVariant="body2"
                  truncate={true}
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
                <AddressLink
                  to={`/c-chain/details/adress/${row.from}`}
                  value={row.from}
                  typographyVariant="body2"
                  truncate={true}
                />
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  To
                </Typography>
                <AddressLink
                  to={`/c-chain/details/adress/${row.to}`}
                  value={row.to}
                  typographyVariant="body2"
                  truncate={true}
                />
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

////////////////////////////////////////////////////////////////////////////

const CustomTable = ({ rows, columns, address }) => {
  return (
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
  );
};

////////////////////////////////////////////////////////////////////////////

const columns = [
  {
    name: 'direction',
    label: 'In/Out',
    field: 'direction',
    align: 'center',
  },
  {
    name: 'txnHash',
    label: 'Txn Hash',
    field: 'txnHash',
    align: 'center',
    type: 'hash',
    // detailsLink: detailsLink,
  },
  {
    name: 'block',
    label: 'Block',
    field: 'block',
    align: 'center',
  },
  {
    name: 'age',
    label: 'Age',
    field: 'age',
    align: 'center',
    type: 'timestamp',
  },
  {
    name: 'from',
    label: 'From',
    field: 'from',
    align: 'center',
    type: 'hash',
    // detailsLink: getAddressDetailsPath,
  },
  {
    name: 'to',
    label: 'To',
    field: 'to',
    align: 'center',
    type: 'hash',
    // detailsLink: getAddressDetailsPath,
  },
  {
    name: 'value',
    label: 'Value',
    field: 'value',
    align: 'center',
    type: 'currency',
  },
  {
    name: 'txnFee',
    label: 'Txn Fee',
    field: 'txnFee',
    align: 'center',
    type: 'currency',
  },
];
