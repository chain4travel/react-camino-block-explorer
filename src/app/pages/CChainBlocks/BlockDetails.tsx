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
import { TransactionList } from 'app/components/LatestBlocksAndTransactionsList';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
// xs, sm, md, lg, and xl.
interface BlockDetail {
  hash: string;
  number: number;
  parentHash: string;
  baseGaseFee: number;
  fees: number;
  gasUsed: string;
  time: string;
  transactionsCount: number;
  extData: string;
  transactions: any;
}

export function BlockDetails() {
  const theme = useTheme();
  const [result, setResult] = React.useState<BlockDetail>();
  const location = useLocation();
  async function fetchBlockDetail(number: number) {
    const res = await axios.get(
      `https://magellan.columbus.camino.foundation/v2/ctxdata/${number}`,
    );
    let block: BlockDetail = {
      hash: res.data.hash, //done
      number: parseInt(res.data.header.number), //done
      parentHash: res.data.header.parentHash, //done
      // parentBlockNumber: parseInt(res.data.header.number), to review
      baseGaseFee: parseInt(res.data.header.baseFeePerGas), //done
      fees: 0,
      gasUsed: parseInt(res.data.header.gasUsed).toLocaleString('en-US'),
      time: new Date(parseInt(res.data.header.timestamp) * 1000).toString(),
      transactionsCount: res.data.transactions
        ? res.data.transactions.length
        : 0,
      extData: res.data.header.extraData,
      transactions: res.data.transactions
        ? res.data.transactions.map(item => ({
            block: item.block,
            index: parseInt(item.receipt.transactionIndex),
            from: item.fromAddr,
            hash: item.hash,
            status: item.receipt.status,
            timestamp: new Date(item.createdAt),
            to: item.toAddr,
            transactionCost: item.receipt.gasUsed
              ? parseInt(item.receipt.gasUsed) *
                parseInt(item.receipt.effectiveGasPrice)
              : parseInt(item.maxFeePerGas) *
                parseInt(item.receipt.effectiveGasPrice),
            value: parseInt(item.value),
          }))
        : [],
    };
    block.fees += block.transactions
      .map(e => e.transactionCost)
      .reduce((pv, cv) => pv + cv, 0);
    setResult(block);
  }
  React.useEffect(() => {
    // console.log(location.pathname.split('/')[3]);
    fetchBlockDetail(parseInt(location.pathname.split('/')[3]));
  }, [location]);

  // const isMobile = useMediaQuery('@media (max-width:899px)');
  return (
    <Container maxWidth="xl">
      <Helmet>
        <title>c-BlockDetails</title>
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
              C-Chain Block {location.pathname.split('/')[3]}
            </Typography>
          </Grid>
          {result && (
            <RowContainer
              type="hash"
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
            {result &&
              Object.entries(result).map((item, index) => {
                if (
                  item[0] !== 'hash' &&
                  index < Object.entries(result).length - 1
                )
                  return (
                    <Grid key={index} item xs={12} md={12} lg={12} xl={12}>
                      <RowContainer
                        type={item[0]}
                        content={item[1]}
                        head={false}
                        theme={theme}
                        parent={parseInt(location.pathname.split('/')[3]) - 1}
                      />
                      {index !== Object.entries(result).length - 1 && (
                        <Divider variant="fullWidth" />
                      )}
                    </Grid>
                  );
                return <div key={index}></div>;
              })}
          </Grid>
        </Grid>
      </Paper>
      <Grid
        container
        rowSpacing={{ xs: 4, lg: '0!important' }}
        columnSpacing={{ xs: 0, lg: 4 }}
      >
        {result && (
          <Grid item xs={12} lg={12}>
            <TransactionList
              title="Block Transactions"
              items={result?.transactions}
              to="/c-chain/transactions"
              link={false}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
