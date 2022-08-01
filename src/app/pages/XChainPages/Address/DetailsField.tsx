import React from 'react';
import { Typography, Box, Grid, Tooltip, Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { CamAmount } from 'app/components/CamAmount';
import CopyToClipboardButton from 'app/components/CopyToClipboardButton';
import useWidth from 'app/hooks/useWidth';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import moment from 'utils/helpers/moment';

export default function DetailsField({
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
}) {
  const getTooltip = (field: string): string | undefined => {
    if (Object.keys(tooltips).includes(field)) {
      return tooltips[field];
    }
    return undefined;
  };
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid
        container
        item
        xs={6}
        md={4}
        lg={4}
        xl={3}
        alignItems="center"
        order={1}
      >
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
}

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
          {moment(value as number).fromNow()}
        </Typography>
        <Typography variant="body2" component="span" noWrap={true}>
          {moment(value as number).format('MMM D, YYYY, h:mm:ss A ([GMT] ZZ)')}
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
