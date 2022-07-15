import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import * as React from 'react';
import { mdiCubeOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import AddressLink from '../AddressLink';
import { GasAmount, CamAmount } from '../CamAmount';
import MainButton from '../MainButton';
import RelativeTime from '../RelativeTime';
import { BlockTableData } from 'types/block';
import { CTransaction } from 'types/transaction';

export function BlockList({
  title,
  items,
  to,
}: {
  title: string;
  items: Array<BlockTableData>;
  to: string;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery('@media (max-width:899px)');
  return (
    <Paper
      variant="outlined"
      square
      sx={{
        backgroundColor: 'primary.dark',
        borderWidth: '1px',
        borderColor: 'primary.light',
        borderStyle: 'solid',
        p: '1.5rem 2rem 1.5rem 2rem',
        [theme.breakpoints.down('md')]: {
          p: '1rem 1.5rem 1rem 1.5rem',
        },
      }}
    >
      {title && (
        <Typography
          variant="h5"
          component="h5"
          fontWeight="fontWeightBold"
          sx={{ paddingBottom: '1rem' }}
        >
          {title}
        </Typography>
      )}
      {items.length > 0 ? (
        <>
          {items.map((item, index) => (
            <div key={index}>
              <Grid
                container
                rowSpacing={2}
                justifyContent="space-between"
                sx={{ padding: '0.5rem 0rem 0.5rem 0rem' }}
              >
                {!isMobile && (
                  <Grid item xs="auto" sx={{ paddingRight: '5px' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'latestList.iconBackground',
                        borderRadius: '12px',
                        minWidth: '50px',
                        minHeight: '50px',
                        width: '50px',
                        height: '50px',
                      }}
                    >
                      <Icon
                        path={mdiCubeOutline}
                        size={1}
                        color="latestList.iconColor"
                      />
                    </Box>
                  </Grid>
                )}
                <Grid item xs={12} md={2} justifyContent="flex-start">
                  <AddressLink
                    to={`${to}/${item.number}`}
                    value={item.number}
                    typographyVariant="body1"
                    truncate={false}
                  />
                  <RelativeTime value={item.timestamp} />
                </Grid>
                <Grid item xs={12} md={6} lg={5} xl={6}>
                  <Typography variant="body1">
                    {item.numberOfTransactions} txs
                  </Typography>
                  <Typography variant="body1" noWrap={true}>
                    {item.hash}
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  md={2}
                  lg={3}
                  xl={2}
                  alignItems="center"
                  justifyContent={isMobile ? 'flex-start' : 'flex-end'}
                >
                  <GasAmount amount={item.gasUsed as number} />
                </Grid>
              </Grid>
              {index !== items.length - 1 && <Divider variant="fullWidth" />}
            </div>
          ))}
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            height: '600px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      <Box
        sx={{
          marginTop: '1rem',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link style={{ textDecoration: 'none' }} to="/all/c-chain/blocks">
          <MainButton variant="outlined">Show All</MainButton>
        </Link>
      </Box>
    </Paper>
  );
}

export function TransactionList({
  title,
  items,
  to,
  link,
}: {
  title: string;
  items: Array<CTransaction>;
  to: string;
  link: boolean;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery('@media (max-width:899px)');
  return (
    <Paper
      variant="outlined"
      square
      sx={{
        backgroundColor: 'primary.dark',
        borderWidth: '1px',
        borderColor: 'primary.light',
        borderStyle: 'solid',
        p: '1.5rem 2rem 1.5rem 2rem',
        [theme.breakpoints.down('md')]: {
          p: '1rem 1.5rem 1rem 1.5rem',
        },
      }}
    >
      {title && (
        <Typography
          variant="h5"
          component="h5"
          fontWeight="fontWeightBold"
          sx={{ paddingBottom: '1rem' }}
        >
          {title}
        </Typography>
      )}
      {items.length > 0 ? (
        <>
          {items.map((item, index) => (
            <div key={index}>
              <Grid
                container
                rowSpacing={{ xs: 1, md: 2 }}
                justifyContent="space-between"
                sx={{ padding: '0.5rem 0rem 0.5rem 0rem' }}
              >
                {!isMobile && (
                  <Grid item xs="auto">
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'latestList.iconBackground',
                        borderRadius: '12px',
                        minWidth: '50px',
                        minHeight: '50px',
                        width: '50px',
                        height: '50px',
                      }}
                    >
                      <Icon
                        path={mdiCubeOutline}
                        size={1}
                        color="latestList.iconColor"
                      />
                    </Box>
                  </Grid>
                )}
                <Grid item xs={12} md={3} justifyContent="flex-start">
                  <AddressLink
                    to={`${to}/${item.hash}`}
                    value={item.hash}
                    typographyVariant="body1"
                    truncate={true}
                  />
                  <RelativeTime value={item.timestamp} />
                </Grid>
                <Grid item xs={12} md={4} xl={5}>
                  <Grid container direction="row">
                    <Grid item xs={2} md={4} xl={3}>
                      <Typography variant="subtitle2">From</Typography>
                    </Grid>
                    <Grid item xs={10} md={8}>
                      <AddressLink
                        to={`/c-chain/details/adress/${item.from}`}
                        value={item.from}
                        typographyVariant="body1"
                        truncate={true}
                      />
                    </Grid>
                  </Grid>
                  <Grid container direction="row">
                    <Grid item xs={2} md={4} xl={3}>
                      <Typography variant="subtitle2">To</Typography>
                    </Grid>
                    <Grid item xs={10} md={8}>
                      <AddressLink
                        to={`/c-chain/details/adress/${item.to}`}
                        value={item.to}
                        typographyVariant="body1"
                        truncate={true}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  md={3}
                  xl="auto"
                  alignItems="center"
                  justifyContent={isMobile ? 'flex-start' : 'flex-end'}
                >
                  <CamAmount amount={item.transactionCost} />
                </Grid>
              </Grid>
              {index !== items.length - 1 && <Divider variant="fullWidth" />}
            </div>
          ))}
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            height: '600px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      {link && (
        <Box
          sx={{
            marginTop: '1rem',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Link
            style={{ textDecoration: 'none' }}
            to="/all/c-chain/transactions"
          >
            <MainButton variant="outlined">Show All</MainButton>
          </Link>
        </Box>
      )}
    </Paper>
  );
}

export function LatestBlocksAndTransactionsList({ blocks, transactions }) {
  return (
    <Grid
      container
      rowSpacing={{ xs: 4, lg: '0!important' }}
      columnSpacing={{ xs: 0, lg: 4 }}
    >
      <Grid item xs={12} lg={6}>
        <BlockList title="Latest Blocks" items={blocks} to="/c-chain/blocks" />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TransactionList
          title="Latest Transactions"
          items={transactions}
          to="/c-chain/transactions"
          link
        />
      </Grid>
    </Grid>
  );
}
