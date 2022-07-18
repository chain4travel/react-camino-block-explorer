import * as React from 'react';
import {
  Grid,
  Paper,
  Typography,
  useTheme,
  TableContainer,
  TableCellProps,
  Box,
  LinearProgress,
} from '@mui/material';
import PageContainer from 'app/components/PageContainer';
import BackButton from 'app/components/BackButton';
import { useInfiniteQuery } from 'react-query';

import Block from './Block';
import CutomTable from 'app/components/Table/CustomTable';
import useWidth from 'app/hooks/useWidth';
import { getBlocksPage } from 'api';

export default function Blocks() {
  const theme = useTheme();
  const {
    fetchNextPage, //function
    hasNextPage, // boolean
    isFetchingNextPage, // boolean
    data,
    // status,
    // error,
  } = useInfiniteQuery(
    '/posts',
    ({ pageParam = NaN }) => getBlocksPage(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length
          ? lastPage[lastPage.length - 1].number - 1
          : undefined;
      },
    },
  );

  const intObserver = React.useRef<IntersectionObserver | null>(null);
  const lastPostRef = React.useCallback(
    block => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current?.disconnect();

      intObserver.current = new IntersectionObserver(blocks => {
        if (blocks[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (block) intObserver.current.observe(block);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );
  // if (status === 'error') return <p className='center'>Error: {error.message}</p>

  const content = data?.pages.map(pg => {
    return pg.map((block, i) => {
      if (pg.length === i + 1) {
        return <Block ref={lastPostRef} key={block.number} block={block} />;
      }
      return <Block key={block.number} block={block} />;
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
          <TableContainer sx={{ height: '650px' }}>
            {isWidescreen || isDesktop ? (
              <CutomTable columns={columns}>{content}</CutomTable>
            ) : (
              <Grid item container alignItems="center">
                {content}
              </Grid>
            )}
            {isFetchingNextPage && (
              <Box sx={{ width: '100%' }}>
                <LinearProgress color="secondary" />
              </Box>
            )}
          </TableContainer>
        </Grid>
      </Paper>
    </PageContainer>
  );
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
