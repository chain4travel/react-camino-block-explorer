import React from 'react';
import PageContainer from 'app/components/PageContainer';
import {
  Typography,
  Box,
  Grid,
  Paper,
  Tab,
  Tabs,
  Divider,
  Tooltip,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CopyToClipboardButton from 'app/components/CopyToClipboardButton';
import { CamAmount } from 'app/components/CamAmount';
import AddressLink from 'app/components/AddressLink';
import Chip from 'app/components/Chip';
import useWidth from 'app/hooks/useWidth';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  style?: React.CSSProperties;
}

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

export default function XAddressDetail() {
  // getting the address from the url by getting what comes after the last slash
  const address = window.location.pathname.split('/').pop() as string;
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <PageContainer pageTitle="X chain" metaContent="chain-overview x-chain">
      <CopyAddress showAddressLabel={true} value={address} />
      <Divider variant="fullWidth" />
      <AddressOverviewCard balance={987704018599999} />
      <Paper square variant="outlined" sx={{ backgroundColor: 'primary.dark' }}>
        <TabsHeader tabValue={value} changeAction={handleChange}>
          <Panels value={value} />
        </TabsHeader>
      </Paper>
    </PageContainer>
  );
}

const TabsHeader = ({ tabValue, changeAction, children }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={changeAction}
          textColor="secondary"
          indicatorColor="secondary"
        >
          {tabOptions.map((option, index) => (
            <Tab
              key={index}
              label={option.label}
              {...a11yProps(index)}
              sx={{ paddingLeft: '10px', paddingRight: '10px' }}
            />
          ))}
        </Tabs>
      </Box>
      <>{children}</>
    </Box>
  );
};

const Panels = ({ value }: { value: number }) => {
  return (
    <>
      <TabPanel value={value} index={0}>
        {/* loop on the transactions */}
        <Grid container spacing={2}>
          <Grid container item xs={12} md={4} spacing={2}>
            <AddressSection />
          </Grid>
          <Grid container item xs spacing={2} sx={{ maxWidth: 'unset' }}>
            <InputOutputSection />
          </Grid>
        </Grid>
        <Divider
          variant="fullWidth"
          sx={{ marginTop: '1rem', marginBottom: '1rem' }}
        />
      </TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
    </>
  );
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        minHeight: '600px',
        ...props.style,
      }}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AddressOverviewCard = ({ balance }: { balance: number }) => {
  return (
    <Paper variant="outlined" sx={{ backgroundColor: 'primary.dark' }}>
      <Box p={2}>
        <Typography
          variant="h5"
          component="h5"
          fontWeight="fontWeightBold"
          gutterBottom={true}
          sx={{ marginBottom: '25px' }}
        >
          Overview
        </Typography>
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

const AddressSection = () => {
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
            to="kfhsdjfaksdgldfsjgidfsjbkdsjfhgksdjkfgsdjkfh"
            value="kfhsdjfaksdgldfsjgidfsjbkdsjfhgksdjkfgsdjkfh"
            typographyVariant="subtitle1"
            truncate={true}
          />
          12 hrs ago
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
            label="base"
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

const CopyAddress = ({
  showAddressLabel,
  value,
}: {
  showAddressLabel: boolean;
  value: string;
}) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ display: 'flex', alignItems: 'flex-end' }}
      wrap="nowrap"
    >
      {showAddressLabel && (
        <Grid
          container
          item
          xs="auto"
          direction="row"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <InsertDriveFileOutlinedIcon
            sx={{ color: 'primary.contrastText', fontSize: '23px' }}
          />
          <Typography
            variant="h5"
            component="h5"
            color="textPrimary"
            fontWeight="fontWeightBold"
            sx={{ marginLeft: '10px' }}
          >
            Address
          </Typography>
        </Grid>
      )}
      <Grid
        item
        xs
        zeroMinWidth
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <Typography
          variant="h6"
          component="span"
          fontWeight="fontWeightBold"
          color="latestList.timestamp"
          noWrap={true}
          sx={{
            display: 'inline-block',
            width: '100%',
          }}
        >
          {value}
        </Typography>
      </Grid>
      <Grid item xs="auto">
        <CopyToClipboardButton value={value} />
      </Grid>
    </Grid>
  );
};

/////////////////////////////////////////////////////////////////////

const InputOutputSection = () => {
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
        <Grid item xs>
          <InputCard />
        </Grid>
      </Grid>
      <Grid container item xs={12} lg={6} spacing={2}>
        <Grid item xs>
          <OutputCard />
        </Grid>
        <Grid item xs>
          <OutputCard />
        </Grid>
      </Grid>
    </>
  );
};

const DetailsField = ({
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

const Field = ({
  type,
  value,
}: {
  type: string;
  value: string | number | object;
}) => {
  if (type === 'string') {
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
    return <CamAmount amount={value as number} currency="CAM" />;
  } else return <></>;
};

const InputCard = () => {
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
        value="columbus1zawetvfggky6yvx5wdcn0tjsalw9ql9dz537x7"
        type="string"
        icon="icon"
        tooltip="Fee"
        allowCopy={true}
      />
      <DetailsField
        field="Signature"
        value="dsfdsfgdgsdfjbsadfckjsadncksuadhcnikasdujcnjaskducbnasjkcb"
        type="string"
        icon="icon"
        tooltip="Fee"
      />
      <DetailsField
        field="Value"
        value={227773}
        type="gwei"
        icon="icon"
        tooltip="Fee"
      />
    </Paper>
  );
};

const OutputCard = () => {
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
        value="columbus1zawetvfggky6yvx5wdcn0tjsalw9ql9dz537x7"
        type="string"
        icon="icon"
        tooltip="Fee"
        allowCopy={true}
      />
      <DetailsField
        field="Value"
        value={25}
        type="gwei"
        icon="icon"
        tooltip="Fee"
      />
    </Paper>
  );
};
