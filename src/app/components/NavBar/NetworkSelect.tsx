import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Box } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { getCchainStatus } from 'store/cchainSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getActiveNetwork,
  getNetworks,
  changeNetwork,
} from '../../../store/app-config';

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

const nameOfActiveNetwork = (networks, id) => {
  let active = networks.find(item => item.id === id);
  return active?.displayName;
};

export default function NetworkSelect() {
  const status = useSelector(getCchainStatus);
  const navigate = useNavigate();
  const networks = useSelector(getNetworks);
  const activeNetwork = useSelector(getActiveNetwork);
  const [network, setNetwork] = React.useState(
    nameOfActiveNetwork(networks, activeNetwork),
  );
  const dispatch = useDispatch();
  const handleChange = (event: SelectChangeEvent) => {
    dispatch(changeNetwork(event.target.value));
  };
  React.useEffect(() => {
    setNetwork(nameOfActiveNetwork(networks, activeNetwork));
    // if (activeNetwork === 'camino-testnet') navigate('/');
    if (activeNetwork === 'mainnet-testnet') navigate('/mainnet');
  }, [activeNetwork]);

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Select
        variant="outlined"
        onChange={handleChange}
        value={activeNetwork}
        IconComponent={KeyboardArrowDownRoundedIcon}
        renderValue={value => {
          return <SelectedNetwork value={network} networkStatus={status} />;
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
        {networks.map((item, index) => {
          return (
            <MenuItem key={index} value={item.displayName}>
              {item.displayName}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
}
