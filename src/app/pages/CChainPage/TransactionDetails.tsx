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
import axios from 'axios';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import { Link } from 'react-router-dom';
// xs, sm, md, lg, and xl.
export interface TranscationDetail {
  hash: string;
  type: number;
  block: number;
  createdAt: Date;
  nonce: number;
  gasPrice: number;
  maxFeePerGas: number;
  maxPriorityFeePerGas: number;
  gasLimit: number;
  value: number;
  fromAddr: string;
  toAddr: string;
  v: string;
  r: string;
  s: string;
  gasUsed: number;
  contractAddress: string;
  transactionCost: number;
  effectiveGasPrice: number;
}

interface TransactionInformations {
  type: number;
  block: number;
  createdAt: Date;
  fromAddr: string;
  toAddr: string;
}

interface TransactionCurrencuy {
  maxFeePerGas: number;
  maxPriorityFeePerGas: number;
  gasUsed: number;
  effectiveGasPrice: number;
  transactionCost: number;
}

export function TransactionDetails() {
  const theme = useTheme();
  const [result, setResult] = React.useState<TranscationDetail>();
  const [detailTr, setDetailTr] = React.useState<TransactionInformations>();
  const [detailCr, setDetailCr] = React.useState<TransactionCurrencuy>();

  async function fetchTransactionDetail(): Promise<void> {
    const res = (
      await axios.get(
        'https://magellan.columbus.camino.foundation/v2/ctransactions?hash=0x500fa9a3b0668483817ad40ac80e3cbd3ad6a5a207c8449d77684d003d162f0d',
      )
    ).data.Transactions[0];
    let transaction: TranscationDetail = {
      block: res.block,
      contractAddress: res.receipt.contractAddress,
      createdAt: new Date(res.createdAt),
      fromAddr: res.fromAddr,
      gasLimit: res.gasLimit,
      gasPrice: parseInt(res.gasPrice),
      gasUsed: parseInt(res.receipt.gasUsed),
      hash: res.hash,
      maxFeePerGas: parseInt(res.maxFeePerGas),
      maxPriorityFeePerGas: parseInt(res.maxPriorityFeePerGas),
      nonce: res.nonce,
      r: res.r,
      s: res.s,
      v: res.v,
      toAddr: res.toAddr,
      type: res.type,
      value: parseInt(res.value),
      transactionCost:
        parseInt(res.receipt.gasUsed) * parseInt(res.receipt.effectiveGasPrice),
      effectiveGasPrice: parseInt(res.receipt.effectiveGasPrice),
    };
    setDetailTr({
      type: transaction.type,
      block: transaction.block,
      createdAt: transaction.createdAt,
      fromAddr: transaction.fromAddr,
      toAddr: transaction.toAddr,
    });
    setDetailCr({
      maxFeePerGas: transaction.maxFeePerGas,
      maxPriorityFeePerGas: transaction.maxPriorityFeePerGas,
      gasUsed: transaction.gasUsed,
      effectiveGasPrice: transaction.effectiveGasPrice,
      transactionCost: transaction.transactionCost,
    });
    // let TransactionInformations
    setResult(transaction);
  }

  useEffectOnce(() => {
    fetchTransactionDetail();
  });

  //   React.useEffect(() => {
  //     if (result) console.log(result['hash']);
  //   }, [result]);
  return (
    <Container maxWidth="xl">
      <Helmet>
        <title>c-TransactionDetails</title>
        <meta name="description" content="chain-overviewBlockDetails" />
      </Helmet>
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
          {result && (
            <RowContainer
              type="transaction"
              content={result['hash']}
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
                      parent
                      //   parent={parseInt(location.pathname.split('/')[3]) - 1}
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
                      //   parent={parseInt(location.pathname.split('/')[3]) - 1}
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
          sx={{
            gap: '20px',
            mt: '10px',
          }}
          md
          lg
        >
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              borderRadius: '25px',
              width: 1,
            }}
          >
            Back
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
}
