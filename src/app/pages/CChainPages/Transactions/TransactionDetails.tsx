import React, { FC } from 'react';
import { Grid, Paper, useTheme, Box } from '@mui/material';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import { useLocation } from 'react-router-dom';
import { fetchTransactionDetails } from 'store/cchainSlice/utils';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import {
  getCTransactionCurrency,
  getCTransactionDetailsStatus,
  getCTransactionInformations,
} from 'store/cchainSlice';
import { Status } from 'types';
import { mdiTransfer } from '@mdi/js';
import PageContainer from 'app/components/PageContainer';
import BackButton from 'app/components/BackButton';
import OutlinedContainer from 'app/components/OutlinedContainer';
import DetailsField from 'app/components/DetailsField';
import Icon from '@mdi/react';
import TransactionDetailView from './TransactionDetailView';
import SubPageTitle from 'app/components/SubPageTitle';

const TransactionDetails: FC = () => {
  const theme = useTheme();
  const detailTr = useAppSelector(getCTransactionInformations);
  const detailCr = useAppSelector(getCTransactionCurrency);
  const loading = useAppSelector(getCTransactionDetailsStatus);
  const location = useLocation();
  const address = location.pathname.split('/')[3];
  const dispatch = useAppDispatch();
  useEffectOnce(() => {
    dispatch(fetchTransactionDetails(address));
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
          <SubPageTitle title="C-Chain Transaction" />
          {loading === Status.SUCCEEDED && (
            <OutlinedContainer transparent={false}>
              <DetailsField
                field="Transaction"
                value={address}
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
};

export default TransactionDetails;
