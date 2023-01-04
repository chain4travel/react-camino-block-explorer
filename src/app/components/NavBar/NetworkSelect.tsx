import * as React from 'react';
import * as Yup from 'yup';
import {
  Box,
  Button,
  MenuItem,
  Typography,
  TextField,
  Chip,
  Menu,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  getActiveNetwork,
  getNetworks,
  changeNetwork,
  addCustomNetwork,
  removeCustomNetwork,
  selectNetworkStatus,
  // editNetwork,
} from 'store/app-config';
import { useNavigate } from 'react-router-dom';
import {
  mdiChevronDown,
  mdiChevronUp,
  mdiTrashCanOutline,
  // mdiPencilOutline,
} from '@mdi/js';
import { Network } from 'types/store';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { resetValidatorsReducer } from 'store/validatorsSlice';
import { resetXPChainReducer } from 'store/xchainSlice';
import { resetCChainReducer } from 'store/cchainSlice';
import MainButton from '../MainButton';
import Icon from '@mdi/react';
import { getChains } from 'api';
import DialogAnimate from './DialogAnimate';
import { useFormik, Form, FormikProvider } from 'formik';

const nameOfActiveNetwork = (networks, id) => {
  let active = networks.find(item => item.id === id);
  return active?.displayName;
};

function NetworkSelectButton({
  networks,
  network,
  networkStatus,
  handleOpenModal,
  setSelectedEvent,
  setSelectedNetwork,
}) {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState<HTMLButtonElement | null>(null);
  const handleOpen = (currentTarget: HTMLButtonElement) => {
    setOpen(currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleRemoveCustomNetwork = (id: string) => {
    const customNetworks = JSON.parse(
      localStorage.getItem('customNetworks') || '[]',
    );
    const newCustomNetworks = customNetworks.filter(
      network => network.id !== id,
    );
    localStorage.setItem('customNetworks', JSON.stringify(newCustomNetworks));
    dispatch(removeCustomNetwork(id));
  };

  // const handleEditCustomNetwork = (id: string) => {
  //   setSelectedEvent('edit');
  //   setSelectedNetwork(id);
  // };

  const handleNetworkChange = value => {
    dispatch(changeNetwork(value));
    handleClose();
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={event => handleOpen(event.currentTarget)}
        endIcon={
          <Icon
            path={open ? mdiChevronUp : mdiChevronDown}
            size={1}
            style={{ marginLeft: '0px' }}
          />
        }
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: `1.5px solid ${alpha(
            `${theme.palette.primary.contrastText}`,
            0.1,
          )}`,
          borderRadius: '10px',
          padding: '0.3rem 1rem',
          textTransform: 'none',
          justifyContent: 'space-between',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            sx={{
              width: '8px',
              height: '8px',
              backgroundColor:
                networkStatus === 'failed' || network === 'Mainnet'
                  ? '#DD5E56'
                  : '#35E9AD',
            }}
          />
          <Typography
            component="span"
            variant="subtitle1"
            fontWeight="500"
            sx={{
              color: 'text.primary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '130px',
              '@media (max-width: 600px)': { maxWidth: '70px' },
            }}
          >
            {network}
          </Typography>
        </Box>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: '6px' }}
        MenuListProps={{
          sx: {
            backgroundColor:
              theme.palette.mode === 'dark'
                ? `${theme.palette.grey[700]}`
                : `${theme.palette.grey[50]}`,
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {networks.map(net => (
          <MenuItem
            key={net.displayName}
            selected={net.displayName === network}
            onClick={() => handleNetworkChange(net.displayName)}
            sx={{
              minWidth: '216px',
              maxWidth: '326px',
              '@media (max-width: 600px)': { minWidth: '100%' },
              justifyContent: 'space-between',
            }}
          >
            <Typography
              component="span"
              variant="body1"
              sx={{
                maxWidth: '250px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {net.displayName}
            </Typography>
            {!net.predefined && (
              <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
                {/* <Button
                  sx={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '7px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: 'auto',
                    border: '1px solid',
                    borderColor: 'secondary.main',
                    color: 'secondary.main',
                    '&:hover': {
                      backgroundColor: 'secondary.main',
                    },
                  }}
                  onClick={() => {
                    handleEditCustomNetwork(net.id);
                  }}
                >
                  <Icon path={mdiPencilOutline} size={0.7} />
                </Button> */}
                <Button
                  sx={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: 'secondary.main',
                    borderRadius: '7px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: 'secondary.main',
                    },
                  }}
                  onClick={() => {
                    handleRemoveCustomNetwork(net.id);
                  }}
                >
                  <Icon path={mdiTrashCanOutline} size={0.7} color="white" />
                </Button>
              </Box>
            )}
          </MenuItem>
        ))}
        <MenuItem
          onClick={handleOpenModal}
          sx={{ typography: 'body1', width: '100%', maxWidth: '326px' }}
        >
          Add Custom Network
        </MenuItem>
      </Menu>
    </>
  );
}

function NewNetworkForm({
  selectedEvent,
  selectedNetwork,
  networks,
  handleClose,
}) {
  const [error, setError] = React.useState('');
  const dispatch = useAppDispatch();
  const getInitialValues = () => {
    if (selectedEvent === 'edit') {
      const network = networks.find(net => net.id === selectedNetwork);
      return network as Network;
    }
    const _newNetwork = {
      id: '',
      displayName: '',
      protocol: 'https',
      host: '',
      magellanAddress: '',
      port: 0,
      predefined: false,
    };
    return _newNetwork;
  };

  const EventSchema = Yup.object().shape({
    id: Yup.string(),
    displayName: Yup.string()
      .required('This field is required')
      .min(3, 'Too Short!'),
    host: Yup.string().required('This field is required'),
    protocol: Yup.string().required('This field is required').min(4).max(5),
    magellanAddress: Yup.string()
      .required('This field is required')
      .matches(/^https?:\/\/.+/, 'URL must start with http:// or https://'),
    port: Yup.number().positive().required('This field is required'),
    predefined: Yup.boolean(),
  });

  const handleDuplicateNetworkId = (
    NewNetwork: Network,
    networks: Network[],
  ) => {
    const _duplicate = networks.find(
      item => item.id === NewNetwork.id && item.predefined === false,
    );
    if (_duplicate) return true;
    return false;
  };

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: EventSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const newNetwork = {
          id: values.displayName.replace(/\s/g, '-').toLowerCase(),
          displayName: values.displayName,
          protocol: values.protocol,
          host: values.host,
          magellanAddress: values.magellanAddress,
          port: values.port,
          predefined: values.predefined,
        };
        if (handleDuplicateNetworkId(newNetwork, networks)) {
          setSubmitting(false);
          setError('Network Name already exists');
          return;
        }
        let customNetworks;
        if (selectedEvent === 'edit') {
          customNetworks = networks.filter(net => net.id !== selectedNetwork);
        } else {
          const ll = localStorage.getItem('customNetworks') as string;
          customNetworks = JSON.parse(ll) || [];
        }
        customNetworks.push(newNetwork);
        localStorage.setItem('customNetworks', JSON.stringify(customNetworks));
        dispatch(addCustomNetwork(newNetwork));
        dispatch(changeNetwork(newNetwork.displayName));
        dispatch(getChains());
        resetForm();
        setSubmitting(false);
        handleClose();
      } catch (error) {
        console.log('error', error);
        console.error(error);
      }
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <DialogContent sx={{ pb: 0, overflowY: 'unset' }}>
          <TextField
            fullWidth
            label="Network Name"
            {...getFieldProps('displayName')}
            error={Boolean(touched.displayName && errors.displayName)}
            helperText={touched.displayName && errors.displayName}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Protocol"
            {...getFieldProps('protocol')}
            inputProps={{ maxLength: 4 }}
            error={Boolean(touched.protocol && errors.protocol)}
            helperText={touched.protocol && errors.protocol}
            sx={{ mb: 3, '& fieldset': { borderRadius: '12px' } }}
          />

          <TextField
            fullWidth
            label="Host"
            {...getFieldProps('host')}
            error={Boolean(touched.host && errors.host)}
            helperText={touched.host && errors.host}
            sx={{ mb: 3, '& fieldset': { borderRadius: '12px' } }}
          />

          <TextField
            fullWidth
            label="Port"
            type="number"
            {...getFieldProps('port')}
            error={Boolean(touched.port && errors.port)}
            helperText={touched.port && errors.port}
            sx={{ mb: 3, '& fieldset': { borderRadius: '12px' } }}
          />

          <TextField
            fullWidth
            label="Magellan Address"
            {...getFieldProps('magellanAddress')}
            error={Boolean(touched.magellanAddress && errors.magellanAddress)}
            helperText={touched.magellanAddress && errors.magellanAddress}
            sx={{ mb: 3, '& fieldset': { borderRadius: '12px' } }}
          />
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
        </DialogContent>

        <DialogActions
          sx={{ display: 'flex', justifyContent: 'center', mb: 2, gap: 2 }}
        >
          <MainButton variant="outlined" type="submit">
            {selectedEvent === 'edit' ? 'Edit Network' : 'Add Network'}
          </MainButton>
          <MainButton variant="contained" onClick={handleClose}>
            Cancel
          </MainButton>
        </DialogActions>
      </Form>
    </FormikProvider>
  );
}

export default function NetworkSelect() {
  const navigate = useNavigate();
  const networks = useAppSelector(getNetworks);
  const activeNetwork = useAppSelector(getActiveNetwork);
  const [network, setNetwork] = React.useState(
    nameOfActiveNetwork(networks, activeNetwork),
  );
  const dispatch = useAppDispatch();

  React.useMemo(() => {
    dispatch(resetCChainReducer());
    dispatch(resetValidatorsReducer());
    dispatch(resetXPChainReducer());
    if (activeNetwork === 'mainnet-testnet') navigate('/mainnet');
    else navigate('/');
  }, [activeNetwork]); // eslint-disable-line

  React.useEffect(() => {
    setNetwork(nameOfActiveNetwork(networks, activeNetwork));
  }, [activeNetwork]); // eslint-disable-line

  const status = useAppSelector(selectNetworkStatus);

  const [open, setOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState('add');
  const [selectedNetwork, setSelectedNetwork] = React.useState(null);

  React.useEffect(() => {
    if (selectedEvent === 'edit') setOpen(true);
  }, [selectedEvent]);

  const handleOpen = () => {
    setSelectedEvent('add');
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <NetworkSelectButton
        networks={networks}
        network={network}
        networkStatus={status}
        handleOpenModal={handleOpen}
        setSelectedEvent={setSelectedEvent}
        setSelectedNetwork={setSelectedNetwork}
      />
      <DialogAnimate open={open} onClose={handleCloseModal}>
        <DialogTitle>
          <Typography
            variant="h5"
            sx={{ textAlign: 'center' }}
            fontWeight="bold"
          >
            {selectedEvent === 'edit' ? 'Edit Network' : 'Add New Network'}
          </Typography>
        </DialogTitle>
        <NewNetworkForm
          selectedEvent={selectedEvent}
          selectedNetwork={selectedNetwork}
          networks={networks}
          handleClose={handleCloseModal}
        />
      </DialogAnimate>
    </>
  );
}
