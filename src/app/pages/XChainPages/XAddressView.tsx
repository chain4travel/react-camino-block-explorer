import * as React from 'react';
import { Grid, TableContainer, Divider } from '@mui/material';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import axios from 'axios';
import { convertMemo, getInputFunds, getOutputFunds } from 'utils/magellan';
import { MagellanXPTransaction } from 'types/magellan-types';
import { AddressSection, InputOutputSection } from './XAddressDetail';
import { useLocation } from 'react-router-dom';

export function createTransaction(magellanTransaction: MagellanXPTransaction) {
  return {
    id: magellanTransaction.id,
    timestamp: new Date(Date.parse(magellanTransaction.timestamp)),
    type: magellanTransaction.type,
    from: getInputFunds(magellanTransaction),
    to: getOutputFunds(magellanTransaction),
    fee: magellanTransaction.txFee,
    inputTotals: magellanTransaction.inputTotals,
    outputTotals: magellanTransaction.outputTotals,
    status: 'accepted', //TODO: set dynamically when magellan delivers this information
    memo: convertMemo(magellanTransaction.memo),
  };
}

function getChainID(location) {
  if (location === 'X')
    return '28Pp3JZJBABUmFQcC9ZXPjuDS6WVX8LeQP9y3DvpCXGiNiTQFV';
  else if (location === 'P') return '11111111111111111111111111111111LpoYY';
}

export default function XPAddressView() {
  const tableEl = React.useRef<HTMLDivElement>(null);
  const [distanceBottom, setDistanceBottom] = React.useState(0);
  const [hasMore] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState<any[]>([]);
  const location = useLocation();

  const CHAIN_ID = getChainID(location.pathname.split('/')[4][0]);
  const loadMore = React.useCallback(() => {
    setLoading(true);
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);
  const loadItems = async () => {
    await new Promise<void>(resolve => {
      loadTransactions({
        address: location.pathname.split('/')[4],
        offset: rows.length,
        limit: 10,
        chainID: CHAIN_ID,
      }).then(res => {
        if (res.length > 0) setRows([...rows, ...res]);
        setLoading(false);
        resolve();
      });
    });
  };
  const scrollListener = React.useCallback(() => {
    if (tableEl && tableEl.current && tableEl.current) {
      let bottom =
        tableEl?.current?.scrollHeight - tableEl?.current?.clientHeight;
      if (!distanceBottom) {
        // calculate distanceBottom that works for you
        setDistanceBottom(Math.round((bottom / 100) * 20));
      }
      if (
        tableEl.current.scrollTop > bottom - distanceBottom &&
        hasMore &&
        !loading
      ) {
        loadMore();
      }
    }
  }, [hasMore, loadMore, loading, distanceBottom]);
  React.useLayoutEffect(() => {
    const tableRef = tableEl.current;
    tableRef?.addEventListener('scroll', scrollListener);
    return () => {
      tableRef?.removeEventListener('scroll', scrollListener);
    };
  }, [scrollListener]);
  useEffectOnce(() => {
    loadTransactions({
      address: location.pathname.split('/')[4],
      offset: 0,
      limit: 10,
      chainID: CHAIN_ID,
    }).then(res => {
      if (res.length > 0) setRows(res);
    });
  });

  return (
    <TableContainer ref={tableEl} sx={{ height: '700px' }}>
      {rows.length > 0 &&
        rows.map(item => {
          return (
            <div key={item.id}>
              <Grid container spacing={2}>
                <Grid container item xs={12} md={4} spacing={2}>
                  <AddressSection
                    id={item.id}
                    type={item.type}
                    timestamp={item.timestamp}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs
                  md={8}
                  spacing={2}
                  sx={{ maxWidth: 'unset' }}
                >
                  <InputOutputSection inputs={item.from} outputs={item.to} />
                </Grid>
              </Grid>
              <Divider
                variant="fullWidth"
                sx={{ marginTop: '1rem', marginBottom: '1rem' }}
              />
            </div>
          );
        })}
    </TableContainer>
  );
}

export async function loadBlocksAndTransactions({
  address,
  offset,
  limit,
  chainID,
}) {
  return await axios.get(
    `https://magellan.columbus.camino.foundation/v2/transactions?chainID=${chainID}&offset=${offset}&limit=${limit}&sort=timestamp-desc&address=${address}`,
  );
}

export async function loadTransactions(offset) {
  let res = (await loadBlocksAndTransactions(offset)).data;
  if (res.transactions && res.transactions.length > 0) {
    let newItems = res.transactions.map(item => createTransaction(item));
    return newItems;
  }
  return [];
}
