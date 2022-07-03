import * as React from 'react';
import Replay from '@mui/icons-material/Replay';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBlocksTransactions,
  getCchainOverreview,
  getTimeFrame,
  loadNumberOfTransactions,
  loadTotalGasFess,
  loadValidators,
  getCchainStatus,
} from 'store/cchainSlice';

export default function GlobalReloadButton() {
  const dispatch = useDispatch();
  const frameTime = useSelector(getTimeFrame);
  const status = useSelector(getCchainStatus);
  const { gasFeesLoading, transactionsLoading, validatorsLoading } =
    useSelector(getCchainOverreview);
  const handleClick = () => {
    if (
      gasFeesLoading !== 'loading' &&
      transactionsLoading !== 'loading' &&
      validatorsLoading !== 'loading' &&
      status !== 'loading'
    ) {
      dispatch(fetchBlocksTransactions());
      dispatch(loadValidators());
      dispatch(loadNumberOfTransactions(frameTime));
      dispatch(loadTotalGasFess(frameTime));
    }
  };
  return (
    <Button
      onClick={handleClick}
      variant="outlined"
      color="secondary"
      sx={{ borderRadius: '25px', marginLeft: 'auto' }}
    >
      <Replay />
    </Button>
  );
}
