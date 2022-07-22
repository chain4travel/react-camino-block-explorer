import React, { useEffect } from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { Timeframe, timeOptions } from 'types';
import {
  getTimeFrame,
  changetimeFrame,
  getCchainOverreview,
} from 'store/cchainSlice';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import {
  loadNumberOfTransactions,
  loadTotalGasFess,
} from 'store/cchainSlice/utils';
import useWidth from 'app/hooks/useWidth';
import { useLocation } from 'react-router-dom';
import { changetimeFrameXPchain, getTimeFrameXPchain } from 'store/xchainSlice';
import {
  loadNumberOfPXTransactions,
  loadTotalPXGasFess,
} from 'store/xchainSlice/utils';
import { getChainID } from 'api/utils';
import { ChainType } from 'utils/types/chain-type';

export default function RowRadioButtonsGroup({
  chainType,
  style,
}: {
  chainType?: string;
  style?: React.CSSProperties;
}) {
  const location = useLocation();
  const timeFrame = useAppSelector(getTimeFrame);
  const timeFrameXPchain = useAppSelector(getTimeFrameXPchain);
  const [value, setValue] = React.useState(Timeframe.HOURS_24 as string);
  const dispatch = useAppDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (gasFeesLoading !== 'loading' && transactionsLoading !== 'loading')
      setValue((event.target as HTMLInputElement).value);
  };
  const { gasFeesLoading, transactionsLoading } =
    useAppSelector(getCchainOverreview);

  useEffect(() => {
    dispatch(loadNumberOfTransactions(timeFrame));
    dispatch(loadTotalGasFess(timeFrame));
  }, [timeFrame]); // eslint-disable-line

  useEffect(() => {
    dispatch(
      loadNumberOfPXTransactions({
        timeframe: timeFrameXPchain,
        chainId: getChainID(location.pathname.split('/')[1][0]),
      }),
    );
    dispatch(
      loadTotalPXGasFess({
        timeframe: timeFrameXPchain,
        chainId: getChainID(location.pathname.split('/')[1][0]),
      }),
    );
  }, [timeFrameXPchain]); // eslint-disable-line

  useEffect(() => {
    if (location.pathname.split('/')[1] === ChainType.C_CHAIN)
      dispatch(changetimeFrame(value));
    else dispatch(changetimeFrameXPchain(value));
  }, [value]); // eslint-disable-line

  const { isMobile } = useWidth();

  return (
    <FormControl sx={{ ...style }}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {timeOptions.map(({ value, label, miniLabel }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={
              <Radio
                sx={{
                  '&.Mui-checked': {
                    color: 'secondary.main',
                  },
                }}
              />
            }
            label={isMobile ? miniLabel : label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
