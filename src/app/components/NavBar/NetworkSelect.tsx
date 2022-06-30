import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
// import Brightness1Icon from '@mui/icons-material/Brightness1';
import { Box } from '@mui/material';

export default function NetworkSelect() {
  const [network, setNetwork] = React.useState('Columbus');
  const handleChange = (event: SelectChangeEvent) => {
    setNetwork(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: '150px' }}>
      <Select
        variant="outlined"
        value={network}
        onChange={handleChange}
        IconComponent={KeyboardArrowDownRoundedIcon}
        sx={{
          height: '40px',
          maxWidth: '250px',
          minWidth: '150px',
          borderRadius: '10px',
          padding: '8px 16px',
        }}
      >
        <MenuItem value="Columbus" divider>
          Columbus
        </MenuItem>
        <MenuItem value="Mainnet">Mainnet</MenuItem>
      </Select>
    </Box>
  );
}
