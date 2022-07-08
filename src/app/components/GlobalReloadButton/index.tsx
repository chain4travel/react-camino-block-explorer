import * as React from 'react';
import Replay from '@mui/icons-material/Replay';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import {
  getCchainOverreview,
  getCchainStatus,
  getTimeFrame,
} from 'store/cchainSlice';
import {
  fetchBlocksTransactions,
  loadNumberOfTransactions,
  loadTotalGasFess,
  loadValidators,
} from 'store/cchainSlice/utils';

export default function GlobalReloadButton({
  style,
}: {
  style?: React.CSSProperties;
}) {
  const dispatch = useAppDispatch();
  const frameTime = useAppSelector(getTimeFrame);
  const status = useAppSelector(getCchainStatus);
  const { gasFeesLoading, transactionsLoading, validatorsLoading } =
    useAppSelector(getCchainOverreview);
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
      sx={{ borderRadius: '25px', maxHeight: '40px', ...style }}
    >
      <Replay />
    </Button>
  );
}
