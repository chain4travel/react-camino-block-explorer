import React from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';

export default function RowRadioButtonsGroup() {
  return (
    <FormControl sx={{ marginLeft: 'auto', marginright: 0 }}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value="24 Hours"
          control={<Radio />}
          label="24 Hours"
          color="secondary"
        />
        <FormControlLabel
          value="7 Days"
          control={<Radio />}
          label="7 Days"
          color="secondary"
        />
        <FormControlLabel
          value="1 Month"
          control={<Radio />}
          label="1 Month"
          color="secondary"
        />
      </RadioGroup>
    </FormControl>
  );
}
