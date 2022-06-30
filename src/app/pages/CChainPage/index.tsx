import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import {
  fetchBlocksTransactions,
  selectAllBlocks,
  getCchainError,
  selectAllTransactions,
  getCchainStatus,
} from 'store/cchainSlice';
import { useDispatch, useSelector } from 'react-redux';

export function CChainPage() {
  const dispatch = useDispatch();
  const blocks = useSelector(selectAllBlocks);
  const transactions = useSelector(selectAllTransactions);
  const status = useSelector(getCchainStatus);
  const error = useSelector(getCchainError);

  React.useEffect(() => {}, [transactions]);
  useEffectOnce(() => {
    dispatch(fetchBlocksTransactions());
  });
  return (
    <>
      <Helmet>
        <title>CChainPage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>
        {status === 'succeeded' ? transactions[0].block : <>loading</>}
      </span>
    </>
  );
}
