import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { transactions } from './fakeData';

import { Link } from 'react-router-dom';

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
import RowRadioButtonsGroup from '../../components/RowRadioButtonsGroup';
import GlobalReloadButton from '../../components/GlobalReloadButton';
import MainButton from '../../components/MainButton';
import AddressLink from '../../components/AddressLink';
import { ReactComponent as TxIcon } from '../../components/assets/transaction.svg';
import { CamAmount } from '../../components/CamAmount';
import { mdiCubeOutline } from '@mdi/js';
import Icon from '@mdi/react';
import RelativeTime from 'app/components/RelativeTime';

export function XChainPage() {
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
      <XPTransactionList ShowAllLink="/">
        {transactions.map((transaction, index) => (
          <XPItemDivider index={index} max={transactions.length - 1}>
            <XPTransactionItem data={transaction} />
          </XPItemDivider>
        ))}
      </XPTransactionList>
    </Container>
  );
}

const XPTransactionItem = ({ data }) => {
  return (
    <Grid container columnSpacing={{ md: 2 }} rowSpacing={{ xs: 2, md: 0 }}>
      <Grid container item xs={12} md={4}>
        <TransactionFirstSection />
      </Grid>
      <Grid container item xs={12} md={8} columnSpacing={2}>
        <Grid item xs={12} lg={8}>
          <TransactionSecondSection type="From" data={data['inputs']} />
          <TransactionSecondSection type="To" data={data['outputs']} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TransactionThirdSection />
        </Grid>
      </Grid>
    </Grid>
  );
};

const TransactionFirstSection = () => {
  const isMobile = useMediaQuery('@media (max-width:600px)');
  return (
    <>
      {!isMobile && (
        <Grid item xs={2} md={3} lg={2}>
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
        <RelativeTime value={1657161269000} />
      </Grid>
      <Grid item xs={4} md={3} lg={4}>
        <Chip label="export" />
      </Grid>
    </>
  );
};

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

const TransactionThirdSection = () => {
  const isMobile = useMediaQuery('@media (max-width:1199px)');
  return (
    <>
      {isMobile && (
        <Divider
          variant="fullWidth"
          sx={{ width: '100%', marginBottom: '1rem' }}
        />
      )}
      <Grid container>
        {isMobile && (
          <Grid item xs={6} sx={{ marginBottom: '16px' }}>
            Fees
          </Grid>
        )}
        <Grid item xs={6} lg={12}>
          <CamAmount amount={9998298250} style={{ marginLeft: 'auto' }} />
        </Grid>
      </Grid>
    </>
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

///////////////////////////////////////////////
////      XPTRANSACTIONLIST COMPONENT      ////
///////////////////////////////////////////////

const XPTransactionList = ({
  chainType,
  ShowAllLink,
  children,
}: {
  chainType?: string;
  ShowAllLink: string;
  children: React.ReactNode;
}) => {
  const theme = useTheme();
  return (
    <Paper
      variant="outlined"
      sx={{
        width: '100%',
        minHeight: '600px',
        backgroundColor: 'primary.dark',
        p: '1.5rem 2rem 1.5rem 2rem',
        [theme.breakpoints.down('md')]: {
          p: '1rem 1.5rem 1rem 1.5rem',
        },
      }}
    >
      <ListTitle style={{ paddingBottom: '1.5rem' }}>
        Latest Transactions
      </ListTitle>
      {children}
      <Link
        to={ShowAllLink}
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          textDecoration: 'none',
        }}
      >
        <MainButton variant="outlined">Show All</MainButton>
      </Link>
    </Paper>
  );
};

///////////////////////////////////////////
////      XPITEMDIVIDER COMPONENT      ////
///////////////////////////////////////////

const XPItemDivider = ({
  index,
  max,
  children,
}: {
  index: number;
  max: number;
  children: React.ReactNode;
}) => {
  return (
    <>
      {children}
      {index < max && (
        <Divider variant="fullWidth" sx={{ marginBottom: '1rem' }} />
      )}
    </>
  );
};

//////////////////////////////////
////      CHIP COMPONENT      ////
//////////////////////////////////

const Chip = ({ label }: { label: string }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'latestList.iconBackground',
        width: 'min-content',
        padding: '5px 10px 5px 10px',
        borderRadius: '12px',
        // textFont: '10px',
        // height: '25px',
        marginLeft: 'auto',
      }}
    >
      <Typography variant="caption" component="span">
        {label}
      </Typography>
    </Box>
  );
};

////////////////////////////////////////
////      LIST TITLE COMPONENT      ////
////////////////////////////////////////

const ListTitle = ({
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
