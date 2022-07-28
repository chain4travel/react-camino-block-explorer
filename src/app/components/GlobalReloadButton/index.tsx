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
} from 'store/cchainSlice/utils';
import { useLocation } from 'react-router-dom';
import { getTimeFrameXPchain, getXPchainOverreview } from 'store/xchainSlice';
import {
  loadNumberOfPXTransactions,
  loadTotalPXGasFess,
} from 'store/xchainSlice/utils';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import { loadValidators } from 'store/validatorsSlice/utils';
import { ChainType } from 'utils/types/chain-type';
import { getChainID } from 'api/utils';

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
  const { gasFeesLoading, transactionsLoading } = useAppSelector(
    location.pathname.split('/')[1] === ChainType.C_CHAIN
      ? getCchainOverreview
      : getXPchainOverreview,
  );
  const handleClick = async () => {
    if (
      location.pathname.split('/')[1] === ChainType.C_CHAIN &&
      gasFeesLoading !== 'loading' &&
      transactionsLoading !== 'loading' &&
      status !== 'loading'
    ) {
      dispatch(fetchBlocksTransactions());
      dispatch(loadValidators());
      dispatch(loadNumberOfTransactions(frameTime));
      dispatch(loadTotalGasFess(frameTime));
    } else if (
      (location.pathname.split('/')[1] === ChainType.X_CHAIN ||
        location.pathname.split('/')[1] === ChainType.P_CHAIN) &&
      gasFeesLoading !== 'loading' &&
      transactionsLoading !== 'loading' &&
      status !== 'loading'
    ) {
      let chainId =
        location.pathname.split('/')[1] === ChainType.X_CHAIN
          ? getChainID(ChainType.X_CHAIN)
          : getChainID(ChainType.P_CHAIN);
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
  useEffectOnce(() => {
    dispatch(loadValidators());
  });
  return (
    <Button
      onClick={handleClick}
      variant="outlined"
      color="secondary"
      sx={{ borderRadius: '25px', maxHeight: '35px', ...style }}
    >
      <Replay sx={{ color: 'primary.contrastText', fontSize: '25px' }} />
    </Button>
  );
}
