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
import BackButton from 'app/components/BackButton';
import { Field } from 'app/components/DetailsField';
import { BlockTableData } from 'types/block';
import axios from 'axios';
import { getRelativeTime } from 'utils/display-utils';
import useWidth from 'app/hooks/useWidth';
import AddressLink from 'app/components/AddressLink';

export interface ColumnType {
  name: string;
  label: string;
  field: string;
  minWidth: number;
  align: TableCellProps['align'];
}

export default function CShowAllBlocks() {
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
      loadBlocks(rows[rows.length - 1].number - 1).then(res => {
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
    loadBlocks(NaN as number).then(res => {
      setRows(res);
    });
  });
  const { isDesktop, isWidescreen } = useWidth();
  return (
    <PageContainer pageTitle="C Blocks" metaContent="chain-overview c-chain">
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
              C-Blocks
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
                  value={row.number}
                  typographyVariant="body1"
                  truncate={false}
                />
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  Age
                </Typography>
                <Field
                  type={'timestamp'}
                  value={row.timestamp.toString()}
                ></Field>
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  # of tx
                </Typography>
                <Field type="number" value={row.numberOfTransactions} />
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  hash
                </Typography>
                <Field type="number" value={row.hash} />
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  Gas Used
                </Typography>
                <Field type="string" value={row.gasUsed?.toString()} />
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  Gas Limit
                </Typography>
                <Field type="string" value={row.gasLimit?.toString()} />
              </Grid>
            </Paper>
          );
        })}
    </Grid>
  );
};

const columns: ColumnType[] = [
  {
    name: 'block',
    label: 'Block',
    field: 'number',
    minWidth: 140,
    align: 'left',
  },
  {
    name: 'age',
    label: 'Age',
    field: 'timestamp',
    minWidth: 140,
    align: 'left',
  },
  {
    name: 'transactions',
    label: '# of tx',
    field: 'numberOfTransactions',
    align: 'center',
    minWidth: 50,
  },
  {
    name: 'hash',
    label: 'Hash',
    field: 'hash',
    align: 'center',
    minWidth: 170,
  },
  {
    name: 'gasUsed',
    minWidth: 50,
    label: 'Gas Used',
    field: 'gasUsed',
    align: 'right',
  },
  {
    minWidth: 50,
    name: 'gasLimit',
    label: 'Gas Limit',
    field: 'gasLimit',
    align: 'right',
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
    `https://magellan.columbus.camino.foundation/v2/cblocks?limit=${50}&limit=${transactionCount}&blockStart=${startingBlock}&blockEnd=${endingBlock}&transactionId=${transactionId}`,
  );
}

export async function loadBlocks(startBlock) {
  let res = (await loadBlocksAndTransactions(startBlock)).data;
  return res.blocks.map(block => {
    return {
      hash: block.hash,
      number: parseInt(block.number),
      timestamp: new Date(block.timestamp * 1000),
      gasLimit: parseInt(block.gasLimit),
      gasUsed: parseInt(block.gasUsed),
      numberOfTransactions: block.evmTx ? block.evmTx : 0,
      blockCost: parseInt(block.gasUsed) * parseInt(block.baseFeePerGas),
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
                  <AddressLink
                    to={`/`}
                    value={row.number}
                    typographyVariant="body1"
                    truncate={false}
                  />
                  {/* <Field type="number" value={row.number} /> */}
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2" component="span" noWrap={true}>
                    {getRelativeTime(row.timestamp as number) + ' ago '}
                  </Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: '50px' }} align="center">
                  <Field type="number" value={row.numberOfTransactions} />
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ maxWidth: { xs: '180px', md: '300px', lg: 'fit' } }}
                >
                  <Field type="string" value={row.hash} />
                </TableCell>
                <TableCell align="right">
                  <Field type="string" value={row.gasUsed?.toString()} />
                </TableCell>
                <TableCell align="right">
                  <Field type="string" value={row.gasLimit?.toString()} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
