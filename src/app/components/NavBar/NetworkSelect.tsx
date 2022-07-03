import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Box } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { getCchainStatus } from 'store/cchainSlice';
import { useSelector } from 'react-redux';

function SelectedNetwork({
  value,
  networkStatus,
}: {
  value: string;
  networkStatus: string;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
      }}
    >
      <FiberManualRecordIcon
        color={networkStatus === 'failed' ? 'error' : 'success'}
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
}

export default function NetworkSelect() {
  const [network, setNetwork] = React.useState('Columbus');
  const status = useSelector(getCchainStatus);

  const handleChange = (event: SelectChangeEvent) => {
    setNetwork(event.target.value as string);
  };

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Select
        variant="outlined"
        value={network}
        onChange={handleChange}
        IconComponent={KeyboardArrowDownRoundedIcon}
        renderValue={value => {
          return <SelectedNetwork value={value} networkStatus={status} />;
        }}
        sx={{
          height: '40px',
          maxWidth: '250px',
          minWidth: '170px',
          borderRadius: '10px',
          padding: '8px 16px',
          '@media (max-width:370px)': {
            minWidth: '120px',
            width: '120px',
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
