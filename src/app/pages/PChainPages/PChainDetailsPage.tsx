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

function sortByAddress(a: Fund, b: Fund): number {
  return a.address.localeCompare(b.address);
}

export interface MagellanXPOutput {
  id: string;
  amount: number;
  addresses: string[];
}

export interface MagellanXPCredentials {
  address: string;
  public_key: string;
  signature: string;
}

export interface MagellanXPInput {
  output: MagellanXPOutput;
  credentials: MagellanXPCredentials[];
}

export interface MagellanXPTransaction {
  id: string;
  timestamp: string;
  inputs: MagellanXPInput[];
  outputs: MagellanXPOutput[];
  txFee: number;
  type: string;
  chainID: string;
  inputTotals: object;
  outputTotals: object;
  memo: string;
}

export interface XPTransaction {
  id: string;
  type: string;
  status: string;
  timestamp?: Date;
  from: Fund[];
  to: Fund[];
  fee: number;
  inputTotals: Record<string, string>;
  outputTotals: Record<string, string>;
  memo?: string;
}

export interface Fund {
  address: string;
  value?: number;
  signature?: string;
}

export interface Fund {
  address: string;
  value?: number;
  signature?: string;
}

export interface XPTransactionDetail {
  id: string;
  type: string;
  status: string;
  timestamp?: Date;
  fee: number;
  memo?: string;
}

function createFundFromOutput(magellanOutput: MagellanXPOutput): Fund {
  return {
    address: magellanOutput.addresses[0], // note
    value: magellanOutput.amount,
  };
}

function getInputFunds(magellanTransaction: MagellanXPTransaction): Fund[] {
  const inputfunds: Fund[] = [];
  if (magellanTransaction.inputs) {
    for (const input of magellanTransaction.inputs) {
      const inputFund = createFundFromOutput(input.output);
      inputFund.signature = input.credentials[0].signature;
      inputfunds.push(inputFund);
    }
  }
  return inputfunds.sort(sortByAddress);
}
function getOutputFunds(magellanTransaction: MagellanXPTransaction): Fund[] {
  const outputfunds: Fund[] = [];
  for (const output of magellanTransaction.outputs || []) {
    outputfunds.push(createFundFromOutput(output));
  }
  return outputfunds.sort(sortByAddress);
}

function convertMemo(memo: string): string {
  try {
    // Turn the string from bytestream to percent-encoding
    const percentEnc = atob(memo)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('');
    // decode base64 string including special characters
    return decodeURIComponent(percentEnc);
  } catch (e) {
    console.log('Memo was not base64 encoded, using raw value');
    return memo;
  }
}

export default function PChainDetailPage() {
  const theme = useTheme();
  const [result, setResult] = React.useState<XPTransaction>();
  const [details, setDetails] = React.useState<XPTransactionDetail>();

  async function fetchTransactionDetail(): Promise<void> {
    const res = (
      await axios.get(
        'https://magellan.columbus.camino.foundation/v2/transactions/2URFh5knSJjXDuZUPsPYwAXuDgSGPS7VSH3yMCDpQDzopfofRX',
      )
    ).data;
    let transaction: XPTransaction = {
      id: res.id,
      status: 'accepted', //TODO: set dynamically when magellan delivers this information
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
    // console.log(transaction);
  }

  useEffectOnce(() => {
    fetchTransactionDetail();
  });

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
            <Link to="/p-chain">
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
              P-Chain Transaction
            </Typography>
          </Grid>
          {result && (
            <RowContainer
              type="id"
              content={result['id']}
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
            {details &&
              Object.entries(details).map((item, index) => {
                if (index === 0) return <div key={index}></div>;
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
                    {index !== Object.entries(details).length - 1 && (
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
