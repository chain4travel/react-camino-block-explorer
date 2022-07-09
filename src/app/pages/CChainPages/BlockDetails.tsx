import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { RowContainer } from '../../components/RowDetailsContainer/RowContainer';

import {
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { TransactionList } from 'app/components/LatestBlocksAndTransactionsList';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { fetchCBlockDetail } from 'store/cchainSlice/utils';
import { getCBlockDetail, getCBlockDetailStatus } from 'store/cchainSlice';
import { LoadingWrapper } from 'app/components/OverviewCards/OverviewCard';

export function BlockDetails() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const blockDetails = useAppSelector(getCBlockDetail);
  const loading = useAppSelector(getCBlockDetailStatus);

  React.useEffect(() => {
    dispatch(fetchCBlockDetail(parseInt(location.pathname.split('/')[3])));
  }, [location, dispatch]);

  React.useEffect(() => {}, [blockDetails]);

  return (
    <Container maxWidth="xl">
      <Helmet>
        <title>C-BlockDetails</title>
        <meta name="description" content="chain-overviewBlockDetails" />
      </Helmet>
      <Paper
        variant="outlined"
        square
        sx={{
          minHeight: '730px',
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
            minHeight: '730px',
            gap: '20px',
            // backgroundColor: 'red',
          }}
        >
          <Grid
            item
            container
            alignItems="center"
            sx={{
              gap: '20px',
            }}
          >
            <Link to="/c-chain">
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  borderRadius: '25px',
                }}
              >
                <ArrowBackIosIcon sx={{ width: '20px', height: '25px' }} />
              </Button>
            </Link>
            <Typography variant="h5" component="h5" fontWeight="fontWeightBold">
              C-Chain Block {location.pathname.split('/')[3]}
            </Typography>
          </Grid>
          <Grid item alignSelf="center" justifySelf="center">
            <LoadingWrapper loading={loading} failedLoadingMsg="-">
              {blockDetails && (
                <RowContainer
                  type="hash"
                  content={blockDetails['hash']}
                  theme={theme}
                  head={true}
                  parent
                />
              )}
              <Grid
                item
                container
                alignItems="center"
                sx={{ border: 'solid 1px', borderColor: 'overviewCard.border' }}
              >
                {blockDetails &&
                  Object.entries(blockDetails).map((item, index) => {
                    if (
                      item[0] !== 'hash' &&
                      index < Object.entries(blockDetails).length - 1
                    )
                      return (
                        <Grid key={index} item xs={12} md={12} lg={12} xl={12}>
                          <RowContainer
                            type={item[0]}
                            content={item[1]}
                            head={false}
                            theme={theme}
                            parent={
                              parseInt(location.pathname.split('/')[3]) - 1
                            }
                          />
                          {index !==
                            Object.entries(blockDetails).length - 1 && (
                            <Divider variant="fullWidth" />
                          )}
                        </Grid>
                      );
                    return <div key={index}></div>;
                  })}
              </Grid>
            </LoadingWrapper>
          </Grid>
        </Grid>
      </Paper>
      <Grid
        container
        rowSpacing={{ xs: 4, lg: '0!important' }}
        columnSpacing={{ xs: 0, lg: 4 }}
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
      </Grid>
    </Container>
  );
}
