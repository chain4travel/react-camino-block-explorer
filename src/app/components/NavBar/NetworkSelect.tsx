import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { getCchainStatus } from 'store/cchainSlice';
import { useSelector } from 'react-redux';

export default function NetworkSelect() {
  const theme = useTheme();
  const [network, setNetwork] = React.useState('Columbus');
  const handleChange = (event: SelectChangeEvent) => {
    setNetwork(event.target.value as string);
  };
  const status = useSelector(getCchainStatus);
  console.log('status', status);

  return (
    <Box>
      <Select
        variant="outlined"
        value={network}
        onChange={handleChange}
        IconComponent={KeyboardArrowDownRoundedIcon}
        renderValue={value => {
          return (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <FiberManualRecordIcon
                color={status === 'failed' ? 'error' : 'success'}
                style={{ width: '12px' }}
              />
              <Box
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {value}
              </Box>
            </Box>
          );
        }}
        sx={{
          height: '40px',
          maxWidth: '250px',
          minWidth: '150px',
          borderRadius: '10px',
          padding: '8px 16px',
          [theme.breakpoints.down('md')]: {
            minWidth: '125px',
          },
          [theme.breakpoints.down('xs')]: {
            maxWidth: '50px !important',
            minWidth: '50px !important',
          },
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
