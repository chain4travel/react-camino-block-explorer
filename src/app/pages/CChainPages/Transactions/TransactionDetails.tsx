import * as React from 'react';
import { Grid, Paper, useTheme, Box, Button } from '@mui/material';
// import axios from 'axios';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import { useLocation } from 'react-router-dom';
// import { TranscationDetail } from 'types/transaction';
import { fetchTransactionDetails } from 'store/cchainSlice/utils';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import {
  getCTransactionCurrencuy,
  getCTransactionDetailsStatus,
  getCTransactionInformations,
  getNextPrevStatus,
  // getNextPrevTx,
} from 'store/cchainSlice';
import { Status } from 'types';
import PageContainer from 'app/components/PageContainer';
import BackButton from 'app/components/BackButton';
import OutlinedContainer from 'app/components/OutlinedContainer';
import DetailsField from 'app/components/DetailsField';
import Icon from '@mdi/react';
import { mdiTransfer } from '@mdi/js';
import TransactionDetailView from './TransactionDetailView';
import {
  fetchNextTransactionDetails,
  fetchPrevTransactionDetails,
  getNextPrevTransaction,
  TrimmedTransactionDetails,
} from './utils';
import SubPageTitle from 'app/components/SubPageTitle';
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js';

export default function TransactionDetails() {
  const theme = useTheme();
  const detailTr = useAppSelector(getCTransactionInformations);
  const detailCr = useAppSelector(getCTransactionCurrencuy);
  const loading = useAppSelector(getCTransactionDetailsStatus);
  const getNPStatus = useAppSelector(getNextPrevStatus);
  // const NextPrevTX = useAppSelector(getNextPrevTx);
  const location = useLocation();
  const address = location.pathname.split('/')[3];
  const dispatch = useAppDispatch();
  const [btnStopper, setBtnStopper] = React.useState(false);

  const handleDelay = () => {
    setBtnStopper(true);
    setTimeout(() => {
      setBtnStopper(false);
    }, 500);
  };

  useEffectOnce(() => {
    dispatch(fetchTransactionDetails(address));
  });
  React.useEffect(() => {
    if (detailTr && getNPStatus === Status.IDLE) {
      let args: TrimmedTransactionDetails = {
        address: detailTr?.fromAddr,
        blockNumber: detailTr?.block,
        transactionID: 0,
      };
      dispatch(fetchPrevTransactionDetails(args));
      dispatch(fetchNextTransactionDetails(args));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailTr]);
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
          <SubPageTitle title="C-Chain Transaction">
            <Box
              sx={{
                display: 'flex',
                whiteSpace: 'nowrap',
                justifyContent: 'flex-end',
              }}
            >
              <RoundButton
                disabled={
                  getNPStatus === Status.LOADING ||
                  loading === Status.LOADING ||
                  btnStopper
                }
                onClick={() => {
                  if (
                    getNPStatus !== Status.LOADING &&
                    loading !== Status.LOADING
                  ) {
                    dispatch(getNextPrevTransaction(true, detailTr));
                  }
                  handleDelay();
                }}
                sx={{ width: '42px', height: '42px', mr: '15px' }}
              >
                <Icon path={mdiChevronLeft} size={1} />
              </RoundButton>
              <RoundButton
                disabled={
                  getNPStatus === Status.LOADING ||
                  loading === Status.LOADING ||
                  btnStopper
                }
                onClick={() => {
                  console.log('next');
                  if (
                    getNPStatus !== Status.LOADING &&
                    loading !== Status.LOADING
                  ) {
                    dispatch(getNextPrevTransaction(false, detailTr));
                  }
                  handleDelay();
                }}
                sx={{ width: '42px', height: '42px' }}
              >
                <Icon path={mdiChevronRight} size={1} />
              </RoundButton>
            </Box>
          </SubPageTitle>
          {loading === Status.SUCCEEDED && (
            <OutlinedContainer transparent={false}>
              <DetailsField
                field="Transaction"
                value={detailTr?.hash}
                type="string"
                icon={
                  <Icon
                    path={mdiTransfer}
                    color="latestList.iconColor"
                    style={{ width: '20px', height: '20px' }}
                  />
                }
                allowCopy={true}
              />
            </OutlinedContainer>
          )}
          <TransactionDetailView detailTr={detailTr} detailCr={detailCr} />
        </Grid>
        {(detailTr || detailCr) && (
          <Box sx={{ display: 'flex', width: '100%', paddingTop: '1rem' }}>
            <BackButton />
          </Box>
        )}
      </Paper>
    </PageContainer>
  );
}

const RoundButton = ({
  // disableButton,
  // handleClick,
  sx,
  children,
  ...props
}) => {
  return (
    <Button
      disableRipple
      // disabled={disableButton}
      sx={{
        color: 'white',
        borderColor: 'secondary.main',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '100%',
        minWidth: 'min-content',
        ...sx,
      }}
      // onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
};
