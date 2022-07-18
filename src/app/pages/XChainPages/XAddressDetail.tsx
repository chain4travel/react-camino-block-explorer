import React, { useState } from 'react';
import PageContainer from 'app/components/PageContainer';
import { Typography, Box, Grid, Paper, Tooltip, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { CamAmount } from 'app/components/CamAmount';
import AddressLink from 'app/components/AddressLink';
import Chip from 'app/components/Chip';
import useWidth from 'app/hooks/useWidth';
// import { useAppDispatch } from 'store/configureStore';
// import { loadAssets } from 'store/xchainSlice/utils';
import CopyAddressTitle from 'app/components/CopyAddressTitle';
import TabsHeader from 'app/components/TabComponent/TabsHeader';
import TabPanel from 'app/components/TabComponent/TabPanel';
import { getRelativeTime } from 'utils/display-utils';
import XPAddressView from './XAddressView';
import axios from 'axios';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
// import DetailsField from 'app/components/DetailsField';
import CopyToClipboardButton from 'app/components/CopyToClipboardButton';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Link } from 'react-router-dom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChainType } from 'utils/types/chain-type';
import { getAddressLink } from 'utils/route-utils';
// import DetailsField from 'app/components/DetailsField';

const tabOptions = [
  {
    label: 'Transactions',
    value: 'transactions',
  },
  {
    label: 'Blocks',
    value: 'blocks',
  },
];

async function loadAssets() {
  const loadedAssets = (
    await axios.get(`https://magellan.columbus.camino.foundation/v2/assets`)
  ).data;
  const newElements = new Map();
  if (loadedAssets.assets) {
    loadedAssets.assets.forEach(element => {
      newElements.set(element.id, {
        name: element.name,
        symbol: element.symbol,
      });
    });
  }
  return newElements;
}
export interface AddressBalance {
  id: string;
  balance: any;
  symbol: string;
  name: string;
}

export default function XAddressDetail() {
  // getting the address from the url by getting what comes after the last slash
  const address = window.location.pathname.split('/').pop() as string;
  const [value, setValue] = React.useState(0);
  const [balance, setBalance] = useState(0);
  // const dispatch = useAppDispatch();
  const location = useLocation();
  async function loadBalances(address) {
    const assets = await loadAssets();
    const addressInfo = await (
      await axios.get(
        `https://magellan.columbus.camino.foundation/v2/addresses/${address}`,
      )
    ).data;
    const addressBalances: AddressBalance[] = [];
    if (addressInfo && addressInfo.assets) {
      Object.entries(addressInfo.assets).forEach(
        ([key, value]: [key: any, value: any]) => {
          addressBalances.push({
            id: key,
            balance: value.balance,
            name: assets.get(key)?.name || 'UNKNOWN',
            symbol: assets.get(key)?.symbol || 'UNKNOWN',
          });
        },
      );
      setBalance(addressBalances[0]?.balance);
      return addressBalances;
    }
    return [];
  }
  useEffectOnce(() => {
    loadBalances(location.pathname.split('/')[3]);
  });
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <PageContainer pageTitle="X chain" metaContent="chain-overview x-chain">
      <CopyAddressTitle showAddressLabel={true} value={address} />
      <AddressOverviewCard balance={balance} />
      <Paper square variant="outlined" sx={{ backgroundColor: 'primary.dark' }}>
        <TabsHeader
          tabValue={value}
          changeAction={handleChange}
          tabOptions={tabOptions}
        >
          <Panels
            value={value}
            chainType={location.pathname.split('/')[1] as ChainType}
          />
        </TabsHeader>
      </Paper>
    </PageContainer>
  );
}

const Panels = ({
  value,
  chainType,
}: {
  value: number;
  chainType: ChainType;
}) => {
  return (
    <>
      <TabPanel value={value} index={0}>
        <XPAddressView chainType={chainType} />
      </TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
    </>
  );
};

export const AddressOverviewCard = ({ balance }: { balance: number }) => {
  return (
    <Paper variant="outlined" sx={{ backgroundColor: 'primary.dark' }}>
      <Box p={2}>
        {/* <Typography
          variant="h5"
          component="h5"
          fontWeight="fontWeightBold"
          gutterBottom={true}
          sx={{ marginBottom: '25px' }}
        >
          Overview
        </Typography> */}
        <Grid container spacing={2}>
          <Grid item xs md={6}>
            <Typography
              variant="body1"
              component="h6"
              fontWeight="fontWeightBold"
              gutterBottom={true}
            >
              Balance
            </Typography>
          </Grid>
          <Grid item md={6}>
            {/* <DetailsField field="Balance" value={balance} type="gwei" /> */}
            <CamAmount amount={balance} currency="nCam" />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export const AddressSection = ({ type, timestamp, id, chainType }) => {
  const { isDesktop } = useWidth();
  return (
    <>
      <Grid
        container
        item
        xs={12}
        md={6}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <AddressLink
            to={`/${chainType}/address/${getAddressLink(chainType, id)}`}
            value={id}
            typographyVariant="subtitle1"
            truncate={true}
          />
          {getRelativeTime(timestamp) + ' ago '}
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        md={6}
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <Grid item xs={12} md={6} lg={7}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'right',
              backgroundColor: 'primary.light',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
            }}
          >
            X
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <Chip
            label={type}
            style={{
              minWidth: '61px',
              height: 'min-content',
              marginLeft: !isDesktop ? '0px' : 'auto',
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

/////////////////////////////////////////////////////////////////////

export const InputOutputSection = ({ inputs, outputs }) => {
  return (
    <>
      <Grid
        container
        item
        xs={12}
        lg={6}
        alignItems="center"
        justifyContent="center"
      >
        {inputs.map((item, index) => {
          return (
            <Grid key={index} item xs>
              <InputCard
                address={item.address}
                signature={item.signature}
                value={item.value}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid container item xs={12} lg={6} spacing={2}>
        {outputs.map((item, index) => {
          return (
            <Grid key={index} item xs>
              <OutputCard address={item.address} value={item.value} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

const InputCard = ({ address, signature, value }) => {
  return (
    <Paper
      sx={{
        padding: '15px',
        gap: '10px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'primary.light',
        backgroundImage: 'none',
      }}
    >
      <Typography
        variant="body1"
        component="h5"
        fontWeight="fontWeightBold"
        sx={{ marginBottom: '15px' }}
      >
        Input
      </Typography>
      <DetailsField
        field="From"
        value={address}
        type="string"
        tooltip="Fee"
        allowCopy={true}
      />
      <DetailsField
        field="Signature"
        value={signature}
        type="string"
        tooltip="Fee"
      />
      <DetailsField field="Value" value={value} type="gwei" tooltip="Fee" />
    </Paper>
  );
};

const OutputCard = ({ address, value }) => {
  return (
    <Paper
      sx={{
        padding: '15px',
        gap: '10px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'primary.light',
        backgroundImage: 'none',
      }}
    >
      <Typography
        variant="body1"
        component="h5"
        fontWeight="fontWeightBold"
        sx={{ marginBottom: '15px' }}
      >
        Output
      </Typography>
      <DetailsField
        field="To"
        value={address}
        type="string"
        tooltip="Fee"
        allowCopy={true}
      />
      <DetailsField field="Value" value={value} type="gwei" tooltip="Fee" />
    </Paper>
  );
};

export const DetailsField = ({
  field,
  value,
  type,
  icon,
  tooltip,
  detailsLink,
  allowCopy,
}: {
  field: string;
  value: string | number | object;
  type: string;
  icon?: string;
  tooltip?: string;
  detailsLink?: string;
  allowCopy?: boolean;
}) => {
  const getTooltip = (field: string): string | undefined => {
    if (Object.keys(tooltips).includes(field)) {
      return tooltips[field];
    }
    return undefined;
  };
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid container item xs={6} md={4} lg={5} alignItems="center" order={1}>
        {(tooltip || getTooltip(field)) && (
          <Tooltip title={getTooltip(field) as string}>
            <HelpOutlineOutlinedIcon style={{ fontSize: '15px' }} />
          </Tooltip>
        )}
        <Typography
          variant="body2"
          component="span"
          fontWeight="fontWeightBold"
          sx={{
            paddingLeft: '10px',
          }}
        >
          {field}
        </Typography>
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Field type={type} value={value} />
      </Grid>
      <>
        {(detailsLink || allowCopy) &&
          value !== undefined &&
          value !== '' &&
          parseInt(value as string) !== 0 && (
            <Grid item xs={6} md="auto" order={{ xs: 2, md: 3 }}>
              {detailsLink && (
                <Link to={detailsLink}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<OpenInNewIcon />}
                  >
                    Open
                  </Button>
                </Link>
              )}
              {allowCopy && value && (
                <Box sx={{ marginLeft: 'auto', width: 'min-content' }}>
                  <CopyToClipboardButton value={value.toString()} />
                </Box>
              )}
            </Grid>
          )}
      </>
    </Grid>
  );
};

export const Field = ({
  type,
  value,
}: {
  type: string;
  value: string | number | object | undefined;
}) => {
  const { isMobile } = useWidth();
  if (type === 'string' || type === 'number' || type === 'monospace') {
    return (
      <Typography
        variant="body2"
        component="span"
        noWrap={true}
        sx={{ width: '100%', display: 'block' }}
      >
        {value as string}
      </Typography>
    );
  } else if (type === 'ctxtype') {
    return (
      <Chip
        label={value === 0 ? 'Legacy' : 'EIP1559'}
        style={{ minWidth: '61px', height: 'min-content' }}
      />
    );
  } else if (type === 'timestamp') {
    return (
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <Typography variant="body2" component="span">
          {getRelativeTime(value as number) + ' ago '}
        </Typography>
        <Typography variant="body2" component="span" noWrap={true}>
          {value as string}
        </Typography>
      </Box>
    );
  } else if (type === 'hexdata') {
    return (
      <Typography
        variant="body2"
        component="span"
        noWrap={true}
        sx={{ width: '100%', display: 'block' }}
      >
        {value as string}
      </Typography>
    );
  } else if (type === 'gwei') {
    return <CamAmount amount={Number(value)} />;
  } else if (type === 'wei') {
    return <CamAmount amount={Number(value)} />;
  } else return <></>;
};

const tooltips: { [key: string]: string } = {
  // Contracts
  Type: 'Defines a transaction type that is an envelope for current and future transaction types',
  Block: 'The number of the block in which the transaction was recorded',
  Date: 'The date and time at which a transaction is validated',
  'Gas Price':
    'Cost per unit of gas specified for the transaction, in Cam and nCam (nano cam) and aCam (atto cam). The higher the gas price the higher chance of getting included in a block',
  'Max fee per gas':
    'The maximum fee per gas that the transaction is willing to pay in total',
  'Max Priority fee per gas':
    'The maximum fee per gas to give miners to incentivize them to include the transaction (Priority fee)',
  'Gas Limit': 'The maximum gas allowed in this transaction',
  Value: 'The value being transacted',
  From: 'The sending party of the transaction',
  To: 'The receiving party of the transaction',
  'Gas Used': 'The  gas used in this transaction',
  'Contract Address': 'The address of the contract that was created',
  'Transaction Cost':
    "The cost of the transaction, calculated using ('Effective Gas Price' * 'Gas Limit')",
  'Effective Gas Price': 'The gas price that the transaction is willing to pay',
  //C-BLOCKS
  Number: 'The block number',
  'Parent Hash': 'The Hash of the parent block',
  'Base Gas Fee':
    'The minimum gas fee required for a transaction to be included in a block',
  Fees: 'The total transaction fees for this block. This is calculated by adding up all the transaction costs.',
  Timestamp: 'The date and time at which a transaction is validated',
  'Transaction Count': 'The amount of transactions in this block',
  'Extra Data': 'Additional data in this block',
  //C-BLOCKS
  Status: 'The transaction status',
  Fee: 'The fee of the transaction',
  Memo: 'The memo that was added to the transaction',
  Signature: 'The signature of the input',
};
