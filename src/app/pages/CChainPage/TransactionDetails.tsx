import * as React from 'react';
import { RowContainer } from '../../components/RowDetailsContainer/RowContainer';

import {
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import axios from 'axios';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import { Link, useLocation } from 'react-router-dom';
// import { TranscationDetail } from 'types/transaction';
import { fetchTransactionDetails } from 'store/cchainSlice/utils';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import {
  getCTransactionCurrencuy,
  getCTransactionDetailsStatus,
  getCTransactionInformations,
} from 'store/cchainSlice';
import { status } from 'types';
import PageContainer from 'app/components/PageContainer';

export default function TransactionDetails() {
  const theme = useTheme();
  const detailTr = useAppSelector(getCTransactionInformations);
  const detailCr = useAppSelector(getCTransactionCurrencuy);
  const loading = useAppSelector(getCTransactionDetailsStatus);
  const location = useLocation();
  const adress = location.pathname.split('/')[3];
  const dispatch = useAppDispatch();
  useEffectOnce(() => {
    dispatch(fetchTransactionDetails(adress));
  });

  return (
    <PageContainer
      pageTitle="C TransactionDetails"
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
        <Grid container direction="column" sx={{ width: 1, gap: '20px' }}>
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
              C-Chain Transaction
            </Typography>
          </Grid>
          {loading === status.SUCCEEDED && (
            <RowContainer
              type="transaction"
              content={adress}
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
            {detailTr &&
              Object.entries(detailTr).map((item, index) => {
                return (
                  <Grid key={index} item xs={12} md={12} lg={12} xl={12}>
                    <RowContainer
                      type={item[0]}
                      content={item[1]}
                      head={false}
                      theme={theme}
                      parent={detailTr.block}
                    />
                    {index !== Object.entries(detailTr).length - 1 && (
                      <Divider variant="fullWidth" />
                    )}
                  </Grid>
                );
              })}
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            sx={{ border: 'solid 1px', borderColor: 'overviewCard.border' }}
          >
            {detailCr &&
              Object.entries(detailCr).map((item, index) => {
                return (
                  <Grid key={index} item xs={12} md={12} lg={12} xl={12}>
                    <RowContainer
                      type={item[0]}
                      content={item[1]}
                      head={false}
                      theme={theme}
                      parent
                    />
                    {index !== Object.entries(detailCr).length - 1 && (
                      <Divider variant="fullWidth" />
                    )}
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          sx={{
            gap: '20px',
            mt: '10px',
          }}
        >
          <Grid item md={6} lg={6}>
            <Link
              style={{ textDecoration: 'none', width: '100%' }}
              to="/c-chain"
            >
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  borderRadius: '12px',
                  width: '1',
                }}
              >
                Back
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </PageContainer>
  );
}
