import React, { useEffect } from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { Timeframe, getLabel } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadNumberOfTransactions,
  loadTotalGasFess,
  getTimeFrame,
  changetimeFrame,
  getCchainOverreview,
} from 'store/cchainSlice';

export default function RowRadioButtonsGroup({
  style,
}: {
  style?: React.CSSProperties;
}) {
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
  const timeOptions = [
    { value: Timeframe.HOURS_24, label: getLabel(Timeframe.HOURS_24) },
    { value: Timeframe.DAYS_7, label: getLabel(Timeframe.DAYS_7) },
    { value: Timeframe.MONTHS_1, label: getLabel(Timeframe.MONTHS_1) },
  ];

  useEffect(() => {
    dispatch(loadNumberOfTransactions(timeFrame));
    dispatch(loadTotalGasFess(timeFrame));
  }, [timeFrame]); // eslint-disable-line

  useEffect(() => {
    dispatch(changetimeFrame(value));
  }, [value]); // eslint-disable-line

  return (
    <FormControl sx={{ ...style }}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {timeOptions.map(({ value, label }) => (
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
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
