import * as React from 'react';
import { Grid, Paper, Typography, useTheme, Box } from '@mui/material';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import { useLocation } from 'react-router-dom';
import PageContainer from 'app/components/PageContainer';
import BackButton from 'app/components/BackButton';
import { mdiTransfer } from '@mdi/js';
import TransactionDetailView from './XPTransactionDetailView';
import { XPTransaction } from 'types/transaction';
import { XPTransactionDetail } from 'app/pages/PChainPages/PChainDetailsPage';
import axios from 'axios';
import { convertMemo, getInputFunds, getOutputFunds } from 'utils/magellan';
import CopyTitleCard from 'app/components/CopyTitleCard';

export default function XPTransactionDetails() {
  const theme = useTheme();
  const [result, setResult] = React.useState<XPTransaction>();
  const [details, setDetails] = React.useState<XPTransactionDetail>();

  const location = useLocation();

  async function fetchTransactionDetail(): Promise<void> {
    const res = (
      await axios.get(
        `https://magellan.columbus.camino.foundation/v2/transactions/${
          location.pathname.split('/')[3]
        }`,
      )
    ).data;
    let transaction: XPTransaction = {
      id: res.id,
      // status: 'accepted', //TODO: set dynamically when magellan delivers this information
      type: res.type,
      timestamp: new Date(Date.parse(res.timestamp)),
      from: getInputFunds(res),
      to: getOutputFunds(res),
      fee: res.txFee,
      inputTotals: res.inputTotals,
      outputTotals: res.outputTotals,
      memo: convertMemo(res.memo),
    };
    setResult(transaction);
    setDetails({
      id: res.id,
      status: 'accepted', //TODO: set dynamically when magellan delivers this information
      type: res.type,
      timestamp: new Date(Date.parse(res.timestamp)),
      fee: res.txFee,
      memo: convertMemo(res.memo),
    });
  }

  useEffectOnce(() => {
    fetchTransactionDetail();
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
            <BackButton />
            <Typography variant="h5" component="h5" fontWeight="fontWeightBold">
              X-Chain Transaction
            </Typography>
          </Grid>
          {details && (
            <CopyTitleCard
              label="Transaction"
              value={details.id}
              icon={mdiTransfer}
            />
          )}
          <TransactionDetailView
            inputs={result?.from}
            outputs={result?.to}
            detailTr={details}
          />
        </Grid>
        {details && (
          <Box sx={{ display: 'flex', width: '100%', paddingTop: '1rem' }}>
            <BackButton />
          </Box>
        )}
      </Paper>
    </PageContainer>
  );
}
