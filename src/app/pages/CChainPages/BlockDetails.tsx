import * as React from 'react';
import { Grid, Paper, Typography, useTheme, Box } from '@mui/material';
import { TransactionList } from 'app/components/LatestBlocksAndTransactionsList';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { fetchCBlockDetail } from 'store/cchainSlice/utils';
import { getCBlockDetail, getCBlockDetailStatus } from 'store/cchainSlice';
import { LoadingWrapper } from 'app/components/LoadingWrapper';
import PageContainer from 'app/components/PageContainer';
import BackButton from 'app/components/BackButton';
import BlockDetailView from './BlockDetailView';

export default function BlockDetails() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const blockDetails = useAppSelector(getCBlockDetail);
  const loading = useAppSelector(getCBlockDetailStatus);

  React.useEffect(() => {
    dispatch(fetchCBlockDetail(parseInt(location.pathname.split('/')[3])));
  }, [location, dispatch]);

  return (
    <PageContainer
      pageTitle="C BlockDetails"
      metaContent="chain-overview c-chain"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Paper
          variant="outlined"
          square
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '600px',
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
            sx={{
              width: 1,
              minHeight: '600px',
              gap: '20px',
            }}
          >
            <Grid item container alignItems="center" sx={{ gap: '20px' }}>
              <BackButton />
              <Typography
                variant="h5"
                component="h5"
                fontWeight="fontWeightBold"
              >
                C-Chain Block {location.pathname.split('/')[3]}
              </Typography>
            </Grid>

            <Box
              sx={{
                display: 'flex',
                direction: 'row',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '20px',
                width: '100%',
              }}
            >
              <BlockDetailView loading={loading} blockDetails={blockDetails} />
            </Box>
          </Grid>
        </Paper>
        <Grid
          container
          rowSpacing={{ xs: 4, lg: '0!important' }}
          columnSpacing={{ xs: 0, lg: 4 }}
        >
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            xs={12}
          >
            <TransactionsView loading={loading} blockDetails={blockDetails} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

const TransactionsView = ({ loading, blockDetails }) => {
  return (
    <LoadingWrapper
      loading={loading}
      failedLoadingMsg="Failed to load transaction"
    >
      {blockDetails && (
        <Grid item xs={12} lg={12}>
          <TransactionList
            title="Block Transactions"
            items={blockDetails?.transactions}
            to="/c-chain/transactions"
            link={false}
          />
        </Grid>
      )}
    </LoadingWrapper>
  );
};
