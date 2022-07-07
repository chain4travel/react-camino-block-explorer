import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  useTheme,
  Divider,
  useMediaQuery,
} from '@mui/material';
import OverviewCards from '../../components/OverviewCards';
import { mdiCubeOutline } from '@mdi/js';
import Icon from '@mdi/react';
import RowRadioButtonsGroup from '../../components/RowRadioButtonsGroup';
import GlobalReloadButton from '../../components/GlobalReloadButton';
import AddressLink from '../../components/AddressLink';
import { CamAmount } from '../../components/CamAmount';
import { ReactComponent as TxIcon } from '../../components/assets/tx.svg';
import MainButton from '../../components/MainButton';

export function XChainPage() {
  const theme = useTheme();
  return (
    <Container fixed maxWidth="xl">
      <Helmet>
        <title>x-chain</title>
        <meta name="description" content="chain-overview x-chain" />
      </Helmet>
      <Grid container spacing={{ xs: 3, md: 1 }}>
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <RowRadioButtonsGroup />
        </Grid>
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <GlobalReloadButton style={{ display: 'flex', marginLeft: 'auto' }} />
        </Grid>
      </Grid>
      <OverviewCards
        numberOfTransactions={0}
        totalGasFees={0}
        numberOfActiveValidators={0}
        numberOfValidators={0}
        percentageOfActiveValidators={0}
        gasFeesLoading="succeeded"
        transactionsLoading="succeeded"
        validatorsLoading="succeeded"
      />
      <Paper
        variant="outlined"
        sx={{
          width: '100%',
          minHeight: '600px',
          backgroundColor: 'primary.dark',
          borderRadius: '12px',
          p: '1.5rem 2rem 1.5rem 2rem',
          [theme.breakpoints.down('md')]: {
            p: '1rem 1.5rem 1rem 1.5rem',
          },
        }}
      >
        <CardTitle style={{ paddingBottom: '1rem' }}>
          Latest Transactions
        </CardTitle>
        <Grid
          container
          columnSpacing={{ xs: 0, md: 4 }}
          rowSpacing={{ xs: 4, md: 0 }}
          sx={{ margin: '0 !important', width: '100% !important' }}
        >
          {transactions.map((transaction, index) => (
            <Grid container key={index}>
              {/* <React.Fragment key={index}> */}
              <Grid container item xs={12} md={4} spacing={2}>
                <TransactionFirstSection />
              </Grid>
              <Grid container item xs={12} md={8} columnSpacing={2}>
                <Grid item xs={12} lg={8}>
                  <TransactionSecondSection
                    type="From"
                    data={transaction['inputs']}
                  />
                  <TransactionSecondSection
                    type="To"
                    data={transaction['outputs']}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TransactionThirdSection />
                </Grid>
              </Grid>
              {/* </React.Fragment> */}
              <Divider sx={{ width: '100%' }} variant="fullWidth" />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <MainButton variant="outlined">Show All</MainButton>
        </Box>
      </Paper>
    </Container>
  );
}

const TransactionThirdSection = () => {
  const isMobile = useMediaQuery('@media (max-width:1199px)');
  return (
    <>
      {isMobile && (
        // <>
        // <Divider variant="fullWidth" sx={{ width: '100%' }} />
        <Grid item xs={6}>
          Fees
        </Grid>
        // </>
      )}
      <Grid item xs={6} lg={12}>
        <CamAmount amount={9998298250} style={{ marginLeft: 'auto' }} />
      </Grid>
    </>
  );
};

// const Tablet = ({ children }: { children: React.ReactNode }) => {
//   const isTablet = useMediaQuery('@media (max-width:1199px)');

//   return <>{isTablet && { children }}</>;
// };

// const Mobile = ({ children }: { children: React.ReactNode }) => {
//   const isTablet = useMediaQuery('@media (max-width:600px)');

//   return <>{isTablet && { children }}</>;
// };

const TransactionSecondSection = ({
  type,
  data,
}: {
  type: string;
  data: object[];
}) => {
  const isMobile = useMediaQuery('@media (max-width:600px)');
  return (
    <div style={{ width: '100%', padding: '0rem 0rem .5rem 0rem' }}>
      <Grid container direction="row" style={{ width: '100%' }}>
        <Grid item xs={3} sm={2}>
          {type}
        </Grid>
        <Grid item xs={9} sm={10}>
          {data.map((tx, index) => (
            <Grid
              container
              style={{ padding: '0rem 0rem .5rem 0rem' }}
              key={index}
            >
              <Grid item xs={12} sm={7} xl={7}>
                <AddressLink
                  to={`/chain`}
                  value={`Qiu6CeNctLShkSfyRELkgivc3bfHffGmiCQZHMj3JU1nM4c3f`}
                  typographyVariant="body1"
                  truncate={true}
                />
              </Grid>
              <Grid item xs={12} sm={5} xl={5}>
                <CamAmount
                  amount={986323974000000}
                  style={{ marginLeft: !isMobile ? 'auto' : '' }}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {type === 'From' && <Divider variant="fullWidth" />}
    </div>
  );
};

const TransactionFirstSection = () => {
  const isMobile = useMediaQuery('@media (max-width:600px)');
  return (
    <>
      {!isMobile && (
        <Grid item xs={3} md={3} lg={2}>
          <BlockTxIcon iconType="transaction" />
        </Grid>
      )}
      <Grid item xs={8} sm={6}>
        <AddressLink
          to={`/chain`}
          value={`Qiu6CeNctLShkSfyRELkgivc3bfHffGmiCQZHMj3JU1nM4c3f`}
          typographyVariant="body1"
          truncate={true}
        />
        <Typography variant="subtitle2" color="latestList.timestamp">
          12 sec ago
        </Typography>
      </Grid>
      <Grid item xs={4} sm={3} md={3}>
        <Chip type="export" />
      </Grid>
    </>
  );
};

const Chip = ({ type }: { type: string }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'latestList.iconBackground',
        width: 'min-content',
        padding: '5px 10px 5px 10px',
        borderRadius: '12px',
        textFont: '10px',
        height: '25px',
        marginLeft: 'auto',
      }}
    >
      <Typography variant="caption" component="span">
        {type}
      </Typography>
    </Box>
  );
};

const CardTitle = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <Typography
      variant="h5"
      component="h5"
      fontWeight="fontWeightBold"
      sx={{ ...style }}
    >
      {children}
    </Typography>
  );
};

const BlockTxIcon = ({ iconType }: { iconType?: string }) => {
  return (
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
      {iconType === 'block' ? (
        <Icon path={mdiCubeOutline} size={1} color="latestList.iconColor" />
      ) : (
        <TxIcon style={{ fill: 'black' }} />
      )}
    </Box>
  );
};

const transactions = [
  {
    id: 'Qiu6CeNctLShkSfyRELkgivc3bfHffGmiCQZHMj3JU1nM4c3f',
    chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
    type: 'export',
    inputs: [
      {
        output: {
          id: '2EYX8qZAViicr7s4WoYM69uFxY61dKZHxt1guuU752iz6w6FCd',
          transactionID: '4xmEgm1UzQ3UYmJLkRNzxkpBWeevYXYdFYx9aM8bq6Go8TGDM',
          outputIndex: 0,
          assetID: 'o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW',
          stake: false,
          frozen: false,
          stakeableout: false,
          genesisutxo: false,
          outputType: 7,
          amount: '9998298250',
          locktime: 0,
          stakeLocktime: 0,
          threshold: 1,
          addresses: ['columbus1y0zajcf8qce2aw0p3ksh5umnjel7cad860m88g'],
          caddresses: null,
          timestamp: '2022-07-04T13:09:23Z',
          redeemingTransactionID:
            'Qiu6CeNctLShkSfyRELkgivc3bfHffGmiCQZHMj3JU1nM4c3f',
          chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
          inChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
          outChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
          groupID: 0,
          payload: '',
          block: '',
          nonce: 0,
          rewardUtxo: false,
        },
        credentials: [
          {
            address: 'columbus1y0zajcf8qce2aw0p3ksh5umnjel7cad860m88g',
            public_key: 'A4YbFCoTU0qYlJV23FN+viB4rLYCE/qO5pJfC5ih1wGF',
            signature:
              'EB4F9fCwchIBcBDgxcKo1awMUbkPPA9tQhBA8ot4TqwYuAUhbWeoA3vEHJ0///+seLPFAvG+wbh9JTGUYsJ+GAA=',
          },
        ],
      },
    ],
    outputs: [
      {
        id: '5xcMFbYPGwjEeVQu9SAL6vUrA9c9qvBd2mnDbjJHSTQ9gSi8B',
        transactionID: 'Qiu6CeNctLShkSfyRELkgivc3bfHffGmiCQZHMj3JU1nM4c3f',
        outputIndex: 1,
        assetID: 'o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW',
        stake: false,
        frozen: false,
        stakeableout: false,
        genesisutxo: false,
        outputType: 7,
        amount: '1000701750',
        locktime: 0,
        stakeLocktime: 0,
        threshold: 1,
        addresses: ['columbus1y0zajcf8qce2aw0p3ksh5umnjel7cad860m88g'],
        caddresses: null,
        timestamp: '2022-07-05T06:58:00Z',
        redeemingTransactionID:
          'y4t7xfqQkss2dRChsisBS2RvHzxwLcgEWXDn5bg1hGFojSJue',
        chainID: 'G52TJLLbDSxYXsijNMpKFB6kAyDVRd9DGWVWYBh86Z8sEXm1i',
        inChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        outChainID: 'G52TJLLbDSxYXsijNMpKFB6kAyDVRd9DGWVWYBh86Z8sEXm1i',
        groupID: 0,
        payload: '',
        block: '',
        nonce: 0,
        rewardUtxo: false,
      },
      {
        id: '4aC57x5pv2t6H564NYZfjafaRf7iBFUuQtj7KiEfEWTKQcWYv',
        transactionID: 'Qiu6CeNctLShkSfyRELkgivc3bfHffGmiCQZHMj3JU1nM4c3f',
        outputIndex: 0,
        assetID: 'o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW',
        stake: false,
        frozen: false,
        stakeableout: false,
        genesisutxo: false,
        outputType: 7,
        amount: '8996596500',
        locktime: 0,
        stakeLocktime: 0,
        threshold: 1,
        addresses: ['columbus1y0zajcf8qce2aw0p3ksh5umnjel7cad860m88g'],
        caddresses: null,
        timestamp: '2022-07-05T06:58:00Z',
        redeemingTransactionID: '',
        chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        inChainID: '',
        outChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        groupID: 0,
        payload: '',
        block: '',
        nonce: 0,
        rewardUtxo: false,
      },
    ],
    memo: '',
    inputTotals: {
      o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW: '9998298250',
    },
    outputTotals: {
      o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW: '9997298250',
    },
    reusedAddressTotals: null,
    timestamp: '2022-07-05T06:58:00Z',
    txFee: 1000000,
    genesis: false,
    rewarded: false,
    rewardedTime: null,
    epoch: 0,
    vertexId: 'M8nkwQXXXVJVc1nCR7AdMiCrHUcjMrc4Mb8tvGn7rQrewbSUe',
    validatorNodeID: '',
    validatorStart: 0,
    validatorEnd: 0,
    txBlockId: '',
  },
  {
    id: '4xmEgm1UzQ3UYmJLkRNzxkpBWeevYXYdFYx9aM8bq6Go8TGDM',
    chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
    type: 'export',
    inputs: [
      {
        output: {
          id: '4ENkC8ZsT3C5nJ6we327PWQz3ouukMUHX5DwhJcx8jDNtHhfa',
          transactionID: '2St7fFZzJdk2BvXSVpVAW9ngHCgidy59YFTk8JBqH6moh4cUiD',
          outputIndex: 0,
          assetID: 'o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW',
          stake: false,
          frozen: false,
          stakeableout: false,
          genesisutxo: false,
          outputType: 7,
          amount: '20000000000',
          locktime: 0,
          stakeLocktime: 0,
          threshold: 1,
          addresses: ['columbus1y0zajcf8qce2aw0p3ksh5umnjel7cad860m88g'],
          caddresses: null,
          timestamp: '2022-07-04T13:09:12Z',
          redeemingTransactionID:
            '4xmEgm1UzQ3UYmJLkRNzxkpBWeevYXYdFYx9aM8bq6Go8TGDM',
          chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
          inChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
          outChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
          groupID: 0,
          payload: '',
          block: '',
          nonce: 0,
          rewardUtxo: false,
        },
        credentials: [
          {
            address: 'columbus1y0zajcf8qce2aw0p3ksh5umnjel7cad860m88g',
            public_key: 'A4YbFCoTU0qYlJV23FN+viB4rLYCE/qO5pJfC5ih1wGF',
            signature:
              'lUPW/rCF//0J42oMQpoGuISvaCzVNYCC9CVX4Br4rypg0Ewm230TK4bRxZGwUJM8JVolSxJyAKu7UIwS6X+FBQA=',
          },
        ],
      },
    ],
    outputs: [
      {
        id: '2EYX8qZAViicr7s4WoYM69uFxY61dKZHxt1guuU752iz6w6FCd',
        transactionID: '4xmEgm1UzQ3UYmJLkRNzxkpBWeevYXYdFYx9aM8bq6Go8TGDM',
        outputIndex: 0,
        assetID: 'o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW',
        stake: false,
        frozen: false,
        stakeableout: false,
        genesisutxo: false,
        outputType: 7,
        amount: '9998298250',
        locktime: 0,
        stakeLocktime: 0,
        threshold: 1,
        addresses: ['columbus1y0zajcf8qce2aw0p3ksh5umnjel7cad860m88g'],
        caddresses: null,
        timestamp: '2022-07-04T13:09:23Z',
        redeemingTransactionID:
          'Qiu6CeNctLShkSfyRELkgivc3bfHffGmiCQZHMj3JU1nM4c3f',
        chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        inChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        outChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        groupID: 0,
        payload: '',
        block: '',
        nonce: 0,
        rewardUtxo: false,
      },
      {
        id: '2Nx99d8d3AW1YgjaRwN9KUBkUQQxn6L1hqVw1CRFpe6zShvrfy',
        transactionID: '4xmEgm1UzQ3UYmJLkRNzxkpBWeevYXYdFYx9aM8bq6Go8TGDM',
        outputIndex: 1,
        assetID: 'o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW',
        stake: false,
        frozen: false,
        stakeableout: false,
        genesisutxo: false,
        outputType: 7,
        amount: '10000701750',
        locktime: 0,
        stakeLocktime: 0,
        threshold: 1,
        addresses: ['columbus1y0zajcf8qce2aw0p3ksh5umnjel7cad860m88g'],
        caddresses: null,
        timestamp: '2022-07-04T13:09:23Z',
        redeemingTransactionID:
          'GhxuDK1LUa3yAitEwfr7SNV6ekMFDBPd43T6Fp49HMdZhcDYi',
        chainID: 'G52TJLLbDSxYXsijNMpKFB6kAyDVRd9DGWVWYBh86Z8sEXm1i',
        inChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        outChainID: 'G52TJLLbDSxYXsijNMpKFB6kAyDVRd9DGWVWYBh86Z8sEXm1i',
        groupID: 0,
        payload: '',
        block: '',
        nonce: 0,
        rewardUtxo: false,
      },
    ],
    memo: '',
    inputTotals: {
      o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW: '20000000000',
    },
    outputTotals: {
      o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW: '19999000000',
    },
    reusedAddressTotals: null,
    timestamp: '2022-07-04T13:09:23Z',
    txFee: 1000000,
    genesis: false,
    rewarded: false,
    rewardedTime: null,
    epoch: 0,
    vertexId: '2rgmm6KgDa4gz1YkaDvn76sixLxQyNWtDDYdYDa4Hny9GdsyRK',
    validatorNodeID: '',
    validatorStart: 0,
    validatorEnd: 0,
    txBlockId: '',
  },
  {
    id: '2St7fFZzJdk2BvXSVpVAW9ngHCgidy59YFTk8JBqH6moh4cUiD',
    chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
    type: 'base',
    inputs: [
      {
        output: {
          id: '2r11tN1hwTrnmTCz6LFrCAVW8BjqTeKc89KEGFxeX36JHFrr2H',
          transactionID: '2SouGT13eAQRPjDS6vNEph9FA6nV66QaPSrMDZtRP4LQj1jGCE',
          outputIndex: 1,
          assetID: 'o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW',
          stake: false,
          frozen: false,
          stakeableout: false,
          genesisutxo: false,
          outputType: 7,
          amount: '986323974000000',
          locktime: 0,
          stakeLocktime: 0,
          threshold: 1,
          addresses: ['columbus1zawetvfggky6yvx5wdcn0tjsalw9ql9dz537x7'],
          caddresses: null,
          timestamp: '2022-07-04T06:50:14Z',
          redeemingTransactionID:
            '2St7fFZzJdk2BvXSVpVAW9ngHCgidy59YFTk8JBqH6moh4cUiD',
          chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
          inChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
          outChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
          groupID: 0,
          payload: '',
          block: '',
          nonce: 0,
          rewardUtxo: false,
        },
        credentials: [
          {
            address: 'columbus1zawetvfggky6yvx5wdcn0tjsalw9ql9dz537x7',
            public_key: 'AmSGBLZe0jjbbH2ouSC91wnP56KDBUcBQMescyzZCJ3h',
            signature:
              'BJxX8bsdrgWsmnt4LvkA6+otrVhaulNhgyf51oIWaLZl8QXusVIAtjZkFqqE079ycxcheVYzAkugSL1no5iB8QA=',
          },
        ],
      },
    ],
    outputs: [
      {
        id: '4ENkC8ZsT3C5nJ6we327PWQz3ouukMUHX5DwhJcx8jDNtHhfa',
        transactionID: '2St7fFZzJdk2BvXSVpVAW9ngHCgidy59YFTk8JBqH6moh4cUiD',
        outputIndex: 0,
        assetID: 'o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW',
        stake: false,
        frozen: false,
        stakeableout: false,
        genesisutxo: false,
        outputType: 7,
        amount: '20000000000',
        locktime: 0,
        stakeLocktime: 0,
        threshold: 1,
        addresses: ['columbus1y0zajcf8qce2aw0p3ksh5umnjel7cad860m88g'],
        caddresses: null,
        timestamp: '2022-07-04T13:09:12Z',
        redeemingTransactionID:
          '4xmEgm1UzQ3UYmJLkRNzxkpBWeevYXYdFYx9aM8bq6Go8TGDM',
        chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        inChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        outChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        groupID: 0,
        payload: '',
        block: '',
        nonce: 0,
        rewardUtxo: false,
      },
      {
        id: 'bUJnpLbAzmtQuUfDdDzt7idrPDn9J53CozLmAMEL9HbXHzhqZ',
        transactionID: '2St7fFZzJdk2BvXSVpVAW9ngHCgidy59YFTk8JBqH6moh4cUiD',
        outputIndex: 1,
        assetID: 'o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW',
        stake: false,
        frozen: false,
        stakeableout: false,
        genesisutxo: false,
        outputType: 7,
        amount: '986303973000000',
        locktime: 0,
        stakeLocktime: 0,
        threshold: 1,
        addresses: ['columbus1zawetvfggky6yvx5wdcn0tjsalw9ql9dz537x7'],
        caddresses: null,
        timestamp: '2022-07-04T13:09:12Z',
        redeemingTransactionID: '',
        chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        inChainID: '',
        outChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        groupID: 0,
        payload: '',
        block: '',
        nonce: 0,
        rewardUtxo: false,
      },
    ],
    memo: 'RGlzY29yZCBmYXVjZXQgVUlEOiAyMDUwMjI4MzMzNjgyMzYwMzI=',
    inputTotals: {
      o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW: '986323974000000',
    },
    outputTotals: {
      o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW: '986323973000000',
    },
    reusedAddressTotals: null,
    timestamp: '2022-07-04T13:09:12Z',
    txFee: 1000000,
    genesis: false,
    rewarded: false,
    rewardedTime: null,
    epoch: 0,
    vertexId: '2TvVKcQBjsQTFp2hb9yvptVZeDRMckQXCr15MxwpzAnsyhPqsa',
    validatorNodeID: '',
    validatorStart: 0,
    validatorEnd: 0,
    txBlockId: '',
  },
  {
    id: '2St7fFZzJdk2BvXSVpVAW9ngHCgidy59YFTk8JBqH6moh4cUiD',
    chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
    type: 'base',
    inputs: [
      {
        output: {
          id: '2r11tN1hwTrnmTCz6LFrCAVW8BjqTeKc89KEGFxeX36JHFrr2H',
          transactionID: '2SouGT13eAQRPjDS6vNEph9FA6nV66QaPSrMDZtRP4LQj1jGCE',
          outputIndex: 1,
          assetID: 'o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW',
          stake: false,
          frozen: false,
          stakeableout: false,
          genesisutxo: false,
          outputType: 7,
          amount: '986323974000000',
          locktime: 0,
          stakeLocktime: 0,
          threshold: 1,
          addresses: ['columbus1zawetvfggky6yvx5wdcn0tjsalw9ql9dz537x7'],
          caddresses: null,
          timestamp: '2022-07-04T06:50:14Z',
          redeemingTransactionID:
            '2St7fFZzJdk2BvXSVpVAW9ngHCgidy59YFTk8JBqH6moh4cUiD',
          chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
          inChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
          outChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
          groupID: 0,
          payload: '',
          block: '',
          nonce: 0,
          rewardUtxo: false,
        },
        credentials: [
          {
            address: 'columbus1zawetvfggky6yvx5wdcn0tjsalw9ql9dz537x7',
            public_key: 'AmSGBLZe0jjbbH2ouSC91wnP56KDBUcBQMescyzZCJ3h',
            signature:
              'BJxX8bsdrgWsmnt4LvkA6+otrVhaulNhgyf51oIWaLZl8QXusVIAtjZkFqqE079ycxcheVYzAkugSL1no5iB8QA=',
          },
        ],
      },
    ],
    outputs: [
      {
        id: '4ENkC8ZsT3C5nJ6we327PWQz3ouukMUHX5DwhJcx8jDNtHhfa',
        transactionID: '2St7fFZzJdk2BvXSVpVAW9ngHCgidy59YFTk8JBqH6moh4cUiD',
        outputIndex: 0,
        assetID: 'o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW',
        stake: false,
        frozen: false,
        stakeableout: false,
        genesisutxo: false,
        outputType: 7,
        amount: '20000000000',
        locktime: 0,
        stakeLocktime: 0,
        threshold: 1,
        addresses: ['columbus1y0zajcf8qce2aw0p3ksh5umnjel7cad860m88g'],
        caddresses: null,
        timestamp: '2022-07-04T13:09:12Z',
        redeemingTransactionID:
          '4xmEgm1UzQ3UYmJLkRNzxkpBWeevYXYdFYx9aM8bq6Go8TGDM',
        chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        inChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        outChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        groupID: 0,
        payload: '',
        block: '',
        nonce: 0,
        rewardUtxo: false,
      },
      {
        id: 'bUJnpLbAzmtQuUfDdDzt7idrPDn9J53CozLmAMEL9HbXHzhqZ',
        transactionID: '2St7fFZzJdk2BvXSVpVAW9ngHCgidy59YFTk8JBqH6moh4cUiD',
        outputIndex: 1,
        assetID: 'o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW',
        stake: false,
        frozen: false,
        stakeableout: false,
        genesisutxo: false,
        outputType: 7,
        amount: '986303973000000',
        locktime: 0,
        stakeLocktime: 0,
        threshold: 1,
        addresses: ['columbus1zawetvfggky6yvx5wdcn0tjsalw9ql9dz537x7'],
        caddresses: null,
        timestamp: '2022-07-04T13:09:12Z',
        redeemingTransactionID: '',
        chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        inChainID: '',
        outChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        groupID: 0,
        payload: '',
        block: '',
        nonce: 0,
        rewardUtxo: false,
      },
    ],
    memo: 'RGlzY29yZCBmYXVjZXQgVUlEOiAyMDUwMjI4MzMzNjgyMzYwMzI=',
    inputTotals: {
      o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW: '986323974000000',
    },
    outputTotals: {
      o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW: '986323973000000',
    },
    reusedAddressTotals: null,
    timestamp: '2022-07-04T13:09:12Z',
    txFee: 1000000,
    genesis: false,
    rewarded: false,
    rewardedTime: null,
    epoch: 0,
    vertexId: '2TvVKcQBjsQTFp2hb9yvptVZeDRMckQXCr15MxwpzAnsyhPqsa',
    validatorNodeID: '',
    validatorStart: 0,
    validatorEnd: 0,
    txBlockId: '',
  },
  {
    id: '2St7fFZzJdk2BvXSVpVAW9ngHCgidy59YFTk8JBqH6moh4cUiD',
    chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
    type: 'base',
    inputs: [
      {
        output: {
          id: '2r11tN1hwTrnmTCz6LFrCAVW8BjqTeKc89KEGFxeX36JHFrr2H',
          transactionID: '2SouGT13eAQRPjDS6vNEph9FA6nV66QaPSrMDZtRP4LQj1jGCE',
          outputIndex: 1,
          assetID: 'o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW',
          stake: false,
          frozen: false,
          stakeableout: false,
          genesisutxo: false,
          outputType: 7,
          amount: '986323974000000',
          locktime: 0,
          stakeLocktime: 0,
          threshold: 1,
          addresses: ['columbus1zawetvfggky6yvx5wdcn0tjsalw9ql9dz537x7'],
          caddresses: null,
          timestamp: '2022-07-04T06:50:14Z',
          redeemingTransactionID:
            '2St7fFZzJdk2BvXSVpVAW9ngHCgidy59YFTk8JBqH6moh4cUiD',
          chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
          inChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
          outChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
          groupID: 0,
          payload: '',
          block: '',
          nonce: 0,
          rewardUtxo: false,
        },
        credentials: [
          {
            address: 'columbus1zawetvfggky6yvx5wdcn0tjsalw9ql9dz537x7',
            public_key: 'AmSGBLZe0jjbbH2ouSC91wnP56KDBUcBQMescyzZCJ3h',
            signature:
              'BJxX8bsdrgWsmnt4LvkA6+otrVhaulNhgyf51oIWaLZl8QXusVIAtjZkFqqE079ycxcheVYzAkugSL1no5iB8QA=',
          },
        ],
      },
    ],
    outputs: [
      {
        id: '4ENkC8ZsT3C5nJ6we327PWQz3ouukMUHX5DwhJcx8jDNtHhfa',
        transactionID: '2St7fFZzJdk2BvXSVpVAW9ngHCgidy59YFTk8JBqH6moh4cUiD',
        outputIndex: 0,
        assetID: 'o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW',
        stake: false,
        frozen: false,
        stakeableout: false,
        genesisutxo: false,
        outputType: 7,
        amount: '20000000000',
        locktime: 0,
        stakeLocktime: 0,
        threshold: 1,
        addresses: ['columbus1y0zajcf8qce2aw0p3ksh5umnjel7cad860m88g'],
        caddresses: null,
        timestamp: '2022-07-04T13:09:12Z',
        redeemingTransactionID:
          '4xmEgm1UzQ3UYmJLkRNzxkpBWeevYXYdFYx9aM8bq6Go8TGDM',
        chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        inChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        outChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        groupID: 0,
        payload: '',
        block: '',
        nonce: 0,
        rewardUtxo: false,
      },
      {
        id: 'bUJnpLbAzmtQuUfDdDzt7idrPDn9J53CozLmAMEL9HbXHzhqZ',
        transactionID: '2St7fFZzJdk2BvXSVpVAW9ngHCgidy59YFTk8JBqH6moh4cUiD',
        outputIndex: 1,
        assetID: 'o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW',
        stake: false,
        frozen: false,
        stakeableout: false,
        genesisutxo: false,
        outputType: 7,
        amount: '986303973000000',
        locktime: 0,
        stakeLocktime: 0,
        threshold: 1,
        addresses: ['columbus1zawetvfggky6yvx5wdcn0tjsalw9ql9dz537x7'],
        caddresses: null,
        timestamp: '2022-07-04T13:09:12Z',
        redeemingTransactionID: '',
        chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        inChainID: '',
        outChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        groupID: 0,
        payload: '',
        block: '',
        nonce: 0,
        rewardUtxo: false,
      },
    ],
    memo: 'RGlzY29yZCBmYXVjZXQgVUlEOiAyMDUwMjI4MzMzNjgyMzYwMzI=',
    inputTotals: {
      o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW: '986323974000000',
    },
    outputTotals: {
      o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW: '986323973000000',
    },
    reusedAddressTotals: null,
    timestamp: '2022-07-04T13:09:12Z',
    txFee: 1000000,
    genesis: false,
    rewarded: false,
    rewardedTime: null,
    epoch: 0,
    vertexId: '2TvVKcQBjsQTFp2hb9yvptVZeDRMckQXCr15MxwpzAnsyhPqsa',
    validatorNodeID: '',
    validatorStart: 0,
    validatorEnd: 0,
    txBlockId: '',
  },
  {
    id: '2St7fFZzJdk2BvXSVpVAW9ngHCgidy59YFTk8JBqH6moh4cUiD',
    chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
    type: 'base',
    inputs: [
      {
        output: {
          id: '2r11tN1hwTrnmTCz6LFrCAVW8BjqTeKc89KEGFxeX36JHFrr2H',
          transactionID: '2SouGT13eAQRPjDS6vNEph9FA6nV66QaPSrMDZtRP4LQj1jGCE',
          outputIndex: 1,
          assetID: 'o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW',
          stake: false,
          frozen: false,
          stakeableout: false,
          genesisutxo: false,
          outputType: 7,
          amount: '986323974000000',
          locktime: 0,
          stakeLocktime: 0,
          threshold: 1,
          addresses: ['columbus1zawetvfggky6yvx5wdcn0tjsalw9ql9dz537x7'],
          caddresses: null,
          timestamp: '2022-07-04T06:50:14Z',
          redeemingTransactionID:
            '2St7fFZzJdk2BvXSVpVAW9ngHCgidy59YFTk8JBqH6moh4cUiD',
          chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
          inChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
          outChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
          groupID: 0,
          payload: '',
          block: '',
          nonce: 0,
          rewardUtxo: false,
        },
        credentials: [
          {
            address: 'columbus1zawetvfggky6yvx5wdcn0tjsalw9ql9dz537x7',
            public_key: 'AmSGBLZe0jjbbH2ouSC91wnP56KDBUcBQMescyzZCJ3h',
            signature:
              'BJxX8bsdrgWsmnt4LvkA6+otrVhaulNhgyf51oIWaLZl8QXusVIAtjZkFqqE079ycxcheVYzAkugSL1no5iB8QA=',
          },
        ],
      },
    ],
    outputs: [
      {
        id: '4ENkC8ZsT3C5nJ6we327PWQz3ouukMUHX5DwhJcx8jDNtHhfa',
        transactionID: '2St7fFZzJdk2BvXSVpVAW9ngHCgidy59YFTk8JBqH6moh4cUiD',
        outputIndex: 0,
        assetID: 'o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW',
        stake: false,
        frozen: false,
        stakeableout: false,
        genesisutxo: false,
        outputType: 7,
        amount: '20000000000',
        locktime: 0,
        stakeLocktime: 0,
        threshold: 1,
        addresses: ['columbus1y0zajcf8qce2aw0p3ksh5umnjel7cad860m88g'],
        caddresses: null,
        timestamp: '2022-07-04T13:09:12Z',
        redeemingTransactionID:
          '4xmEgm1UzQ3UYmJLkRNzxkpBWeevYXYdFYx9aM8bq6Go8TGDM',
        chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        inChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        outChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        groupID: 0,
        payload: '',
        block: '',
        nonce: 0,
        rewardUtxo: false,
      },
      {
        id: 'bUJnpLbAzmtQuUfDdDzt7idrPDn9J53CozLmAMEL9HbXHzhqZ',
        transactionID: '2St7fFZzJdk2BvXSVpVAW9ngHCgidy59YFTk8JBqH6moh4cUiD',
        outputIndex: 1,
        assetID: 'o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW',
        stake: false,
        frozen: false,
        stakeableout: false,
        genesisutxo: false,
        outputType: 7,
        amount: '986303973000000',
        locktime: 0,
        stakeLocktime: 0,
        threshold: 1,
        addresses: ['columbus1zawetvfggky6yvx5wdcn0tjsalw9ql9dz537x7'],
        caddresses: null,
        timestamp: '2022-07-04T13:09:12Z',
        redeemingTransactionID: '',
        chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        inChainID: '',
        outChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        groupID: 0,
        payload: '',
        block: '',
        nonce: 0,
        rewardUtxo: false,
      },
    ],
    memo: 'RGlzY29yZCBmYXVjZXQgVUlEOiAyMDUwMjI4MzMzNjgyMzYwMzI=',
    inputTotals: {
      o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW: '986323974000000',
    },
    outputTotals: {
      o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW: '986323973000000',
    },
    reusedAddressTotals: null,
    timestamp: '2022-07-04T13:09:12Z',
    txFee: 1000000,
    genesis: false,
    rewarded: false,
    rewardedTime: null,
    epoch: 0,
    vertexId: '2TvVKcQBjsQTFp2hb9yvptVZeDRMckQXCr15MxwpzAnsyhPqsa',
    validatorNodeID: '',
    validatorStart: 0,
    validatorEnd: 0,
    txBlockId: '',
  },
  {
    id: '2St7fFZzJdk2BvXSVpVAW9ngHCgidy59YFTk8JBqH6moh4cUiD',
    chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
    type: 'base',
    inputs: [
      {
        output: {
          id: '2r11tN1hwTrnmTCz6LFrCAVW8BjqTeKc89KEGFxeX36JHFrr2H',
          transactionID: '2SouGT13eAQRPjDS6vNEph9FA6nV66QaPSrMDZtRP4LQj1jGCE',
          outputIndex: 1,
          assetID: 'o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW',
          stake: false,
          frozen: false,
          stakeableout: false,
          genesisutxo: false,
          outputType: 7,
          amount: '986323974000000',
          locktime: 0,
          stakeLocktime: 0,
          threshold: 1,
          addresses: ['columbus1zawetvfggky6yvx5wdcn0tjsalw9ql9dz537x7'],
          caddresses: null,
          timestamp: '2022-07-04T06:50:14Z',
          redeemingTransactionID:
            '2St7fFZzJdk2BvXSVpVAW9ngHCgidy59YFTk8JBqH6moh4cUiD',
          chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
          inChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
          outChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
          groupID: 0,
          payload: '',
          block: '',
          nonce: 0,
          rewardUtxo: false,
        },
        credentials: [
          {
            address: 'columbus1zawetvfggky6yvx5wdcn0tjsalw9ql9dz537x7',
            public_key: 'AmSGBLZe0jjbbH2ouSC91wnP56KDBUcBQMescyzZCJ3h',
            signature:
              'BJxX8bsdrgWsmnt4LvkA6+otrVhaulNhgyf51oIWaLZl8QXusVIAtjZkFqqE079ycxcheVYzAkugSL1no5iB8QA=',
          },
        ],
      },
    ],
    outputs: [
      {
        id: '4ENkC8ZsT3C5nJ6we327PWQz3ouukMUHX5DwhJcx8jDNtHhfa',
        transactionID: '2St7fFZzJdk2BvXSVpVAW9ngHCgidy59YFTk8JBqH6moh4cUiD',
        outputIndex: 0,
        assetID: 'o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW',
        stake: false,
        frozen: false,
        stakeableout: false,
        genesisutxo: false,
        outputType: 7,
        amount: '20000000000',
        locktime: 0,
        stakeLocktime: 0,
        threshold: 1,
        addresses: ['columbus1y0zajcf8qce2aw0p3ksh5umnjel7cad860m88g'],
        caddresses: null,
        timestamp: '2022-07-04T13:09:12Z',
        redeemingTransactionID:
          '4xmEgm1UzQ3UYmJLkRNzxkpBWeevYXYdFYx9aM8bq6Go8TGDM',
        chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        inChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        outChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        groupID: 0,
        payload: '',
        block: '',
        nonce: 0,
        rewardUtxo: false,
      },
      {
        id: 'bUJnpLbAzmtQuUfDdDzt7idrPDn9J53CozLmAMEL9HbXHzhqZ',
        transactionID: '2St7fFZzJdk2BvXSVpVAW9ngHCgidy59YFTk8JBqH6moh4cUiD',
        outputIndex: 1,
        assetID: 'o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW',
        stake: false,
        frozen: false,
        stakeableout: false,
        genesisutxo: false,
        outputType: 7,
        amount: '986303973000000',
        locktime: 0,
        stakeLocktime: 0,
        threshold: 1,
        addresses: ['columbus1zawetvfggky6yvx5wdcn0tjsalw9ql9dz537x7'],
        caddresses: null,
        timestamp: '2022-07-04T13:09:12Z',
        redeemingTransactionID: '',
        chainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        inChainID: '',
        outChainID: '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV',
        groupID: 0,
        payload: '',
        block: '',
        nonce: 0,
        rewardUtxo: false,
      },
    ],
    memo: 'RGlzY29yZCBmYXVjZXQgVUlEOiAyMDUwMjI4MzMzNjgyMzYwMzI=',
    inputTotals: {
      o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW: '986323974000000',
    },
    outputTotals: {
      o8seyjX6WupqJ1CE8CeaozK13kqVgc4DFvdvc4crfacLFBauW: '986323973000000',
    },
    reusedAddressTotals: null,
    timestamp: '2022-07-04T13:09:12Z',
    txFee: 1000000,
    genesis: false,
    rewarded: false,
    rewardedTime: null,
    epoch: 0,
    vertexId: '2TvVKcQBjsQTFp2hb9yvptVZeDRMckQXCr15MxwpzAnsyhPqsa',
    validatorNodeID: '',
    validatorStart: 0,
    validatorEnd: 0,
    txBlockId: '',
  },
];
