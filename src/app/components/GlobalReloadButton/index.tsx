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
import { useLocation } from 'react-router-dom';
import { getTimeFrameXPchain, getXPchainOverreview } from 'store/xchainSlice';
import {
  loadNumberOfPXTransactions,
  loadTotalPXGasFess,
} from 'store/xchainSlice/utils';

export default function GlobalReloadButton({
  style,
}: {
  style?: React.CSSProperties;
}) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const frameTime = useAppSelector(getTimeFrame);
  const status = useAppSelector(getCchainStatus);
  const timeFrameXPchain = useAppSelector(getTimeFrameXPchain);
  const { gasFeesLoading, transactionsLoading, validatorsLoading } =
    useAppSelector(
      location.pathname.split('/')[1] === 'c-chain'
        ? getCchainOverreview
        : getXPchainOverreview,
    );
  const handleClick = () => {
    if (
      location.pathname.split('/')[1] === 'c-chain' &&
      gasFeesLoading !== 'loading' &&
      transactionsLoading !== 'loading' &&
      validatorsLoading !== 'loading' &&
      status !== 'loading'
    ) {
      dispatch(fetchBlocksTransactions());
      dispatch(loadValidators());
      dispatch(loadNumberOfTransactions(frameTime));
      dispatch(loadTotalGasFess(frameTime));
    } else if (
      (location.pathname.split('/')[1] === 'x-chain' ||
        location.pathname.split('/')[1] === 'p-chain') &&
      gasFeesLoading !== 'loading' &&
      transactionsLoading !== 'loading' &&
      validatorsLoading !== 'loading' &&
      status !== 'loading'
    ) {
      let chainId =
        location.pathname.split('/')[1] === 'x-chain'
          ? '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV'
          : '11111111111111111111111111111111LpoYY';
      dispatch(
        loadNumberOfPXTransactions({
          timeframe: timeFrameXPchain,
          chainId,
        }),
      );
      dispatch(
        loadTotalPXGasFess({
          timeframe: timeFrameXPchain,
          chainId,
        }),
      );
      dispatch(loadValidators());
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
