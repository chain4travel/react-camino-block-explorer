import * as React from 'react';
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Replay } from '@mui/icons-material';
import styled from 'styled-components/macro';
import axios from 'axios';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import { getRelativeTime } from 'utils/display/display-utils';
import { TableCellProps } from '@mui/material';
import AddressLink from '../AddressLink';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';

interface BlockTableData {
  number: number;
  timestamp: number;
  numberOfTransactions: number;
  hash: string;
  gasUsed?: number;
  gasLimit?: number;
  blockCost: number;
}

const Wrraper = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export async function loadBlocksAndTransactions(
  startingBlock = NaN,
  endingBlock = NaN,
  transactionId = 0,
  blockCount = 10,
  transactionCount = 0,
) {
  console.log(startingBlock);
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

export interface ColumnType {
  name: string;
  label: string;
  field: string;
  minWidth: number;
  align: TableCellProps['align'];
}

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

export function TableDetials() {
  const theme = useTheme();
  const tableEl = React.useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('@media (max-width:1200px)');
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
  return (
    <Wrraper>
      <Paper
        variant="outlined"
        square
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '80%',
          minHeight: '800px',
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
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ paddingBottom: '1rem' }}
        >
          <Typography
            variant="h5"
            component="h5"
            fontWeight="fontWeightBold"
            sx={{ paddingBottom: '1rem' }}
          >
            C-Blocks
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              borderRadius: '25px',
              marginLeft: 'auto',
            }}
          >
            <Replay sx={{ width: '25px', height: '25px' }} />
          </Button>
        </Grid>
        <Grid container sx={{ flexGrow: 1, width: 1 }}>
          <TableContainer sx={{ height: '650px' }} ref={tableEl}>
            <Table stickyHeader aria-label="caption table">
              {!isMobile && (
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
                      <TableCell
                        sx={{ backgroundColor: 'primary.dark', wrap: 'nowrap' }}
                        key={column.name}
                        align={column.align}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
              )}
              <TableBody>
                {rows?.map((row, index) => {
                  if (isMobile)
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <Grid
                            container
                            rowSpacing={2}
                            justifyContent="space-between"
                          >
                            <Grid item xs={12}>
                              <Typography
                                variant="subtitle2"
                                color="latestList.timestamp"
                              >
                                Block
                              </Typography>
                              <AddressLink
                                to={`${''}/${row.number}`}
                                value={row.number}
                                typographyVariant="body1"
                                truncate={true}
                              />
                            </Grid>
                            <Grid item xs={12} justifyContent="flex-start">
                              <Typography
                                variant="subtitle2"
                                color="latestList.timestamp"
                              >
                                Age
                              </Typography>
                              <Typography variant="body1">
                                {getRelativeTime(row.timestamp) + ' ago'}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} justifyContent="flex-start">
                              <Typography
                                variant="subtitle2"
                                color="latestList.timestamp"
                              >
                                # of tx
                              </Typography>
                              <Typography variant="body1">
                                {row.numberOfTransactions}
                              </Typography>
                            </Grid>
                            <Grid item xs md={6} lg={5} xl={6}>
                              <Typography
                                variant="subtitle2"
                                color="latestList.timestamp"
                              >
                                Hash
                              </Typography>
                              <Typography variant="body1">
                                {row.hash}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} justifyContent="flex-start">
                              <Typography
                                variant="subtitle2"
                                color="latestList.timestamp"
                              >
                                Gas Used
                              </Typography>
                              <Typography variant="body1">
                                {row.gasUsed}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} justifyContent="flex-start">
                              <Typography
                                variant="subtitle2"
                                color="latestList.timestamp"
                              >
                                Gas Limit
                              </Typography>
                              <Typography variant="body1">
                                {row.gasLimit}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    );
                  return (
                    <TableRow
                      key={index}
                      sx={[
                        {
                          // display: 'flex',
                          // flexDirection: 'column',
                        },
                      ]}
                    >
                      <TableCell component="th" scope="row">
                        <AddressLink
                          to={`/c-chain/blocks/${row.number}`}
                          value={row.number}
                          typographyVariant="body1"
                          truncate={true}
                        />
                      </TableCell>
                      <TableCell align="left">
                        {getRelativeTime(row.timestamp) + ' ago'}
                      </TableCell>
                      <TableCell sx={{ maxWidth: '50px' }} align="center">
                        {row.numberOfTransactions}
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          // sx={{ maxWidth: '240px' }}
                          noWrap={true}
                        >
                          {row.hash}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{row.gasUsed}</TableCell>
                      <TableCell align="right">{row.gasLimit}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="end"
          sx={{ paddingTop: '1rem' }}
        >
          <Link to="/c-chain">
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                borderRadius: '25px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowBackIosIcon sx={{ width: '20px', height: '20px' }} />
            </Button>
          </Link>
        </Grid>
      </Paper>
    </Wrraper>
  );
}
