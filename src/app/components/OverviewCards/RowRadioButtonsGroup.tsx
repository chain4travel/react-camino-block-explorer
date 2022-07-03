import React, { useEffect } from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { Timeframe } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadNumberOfTransactions,
  loadTotalGasFess,
  getTimeFrame,
  changetimeFrame,
  getCchainOverreview,
} from 'store/cchainSlice';

export default function RowRadioButtonsGroup() {
  const timeFrame = useSelector(getTimeFrame);
  const [value, setValue] = React.useState(Timeframe.HOURS_24 as string);
  const dispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      gasFeesLoading !== 'loading' &&
      transactionsLoading !== 'loading' &&
      validatorsLoading !== 'loading'
    )
      setValue((event.target as HTMLInputElement).value);
  };
  const { gasFeesLoading, transactionsLoading, validatorsLoading } =
    useSelector(getCchainOverreview);
  useEffect(() => {
    dispatch(loadNumberOfTransactions(timeFrame));
    dispatch(loadTotalGasFess(timeFrame));
  }, [timeFrame]);

  useEffect(() => {
    dispatch(changetimeFrame(value));
  }, [value]);

  return (
    <FormControl sx={{ marginLeft: 'auto', marginright: 0 }}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value={Timeframe.HOURS_24}
          control={
            <Radio
              sx={{
                color: 'secondary',
                '&.Mui-checked': {
                  color: 'red',
                },
              }}
            />
          }
          label="24 Hours"
          color="secondary"
        />
        <FormControlLabel
          value={Timeframe.DAYS_7}
          control={
            <Radio
              sx={{
                color: 'secondary',
                '&.Mui-checked': {
                  color: 'red',
                },
              }}
            />
          }
          label="7 Days"
          color="secondary"
        />
        <FormControlLabel
          value={Timeframe.MONTHS_1}
          control={
            <Radio
              sx={{
                color: 'secondary',
                '&.Mui-checked': {
                  color: 'red',
                },
              }}
            />
          }
          label="1 Month"
          color="secondary"
        />
      </RadioGroup>
    </FormControl>
  );
}
