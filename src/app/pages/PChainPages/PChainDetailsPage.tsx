import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { RowContainer } from '../../components/RowDetailsContainer/RowContainer';

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import { Link, useLocation } from 'react-router-dom';
import { XPTransaction } from 'types/transaction';
// import { XPTransactionDetail } from '../PChainPages/PChainDetailsPage';
import { convertMemo, getInputFunds, getOutputFunds } from 'utils/magellan';
import { CamAmount } from 'app/components/CamAmount';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CopyToClipboardButton from 'app/components/CopyToClipboardButton';
import MainButton from 'app/components/MainButton';

export interface XPTransactionDetail {
  id: string;
  type: string;
  status: string;
  timestamp?: Date;
  fee: number;
  memo?: string;
}
// const Helper = ({ item, theme }) => {
//   return (
//     <>
//       <Typography sx={{ margin: '1rem' }} variant="body1">
//         Output
//       </Typography>
//       {Object.entries(item).map(t => {
//         return (
//           <RowContainer
//             type={t[0]}
//             content={t[1]}
//             head={false}
//             theme={theme}
//             parent
//           />
//         );
//       })}
//     </>
//   );
// };

export default function PChainDetailPage() {
  const theme = useTheme();
  const [result, setResult] = React.useState<XPTransaction>();
  const [details, setDetails] = React.useState<XPTransactionDetail>();

  const location = useLocation();
  // React.useEffect(() => {
  //   console.log(location.pathname.split('/')[4]);
  // }, []);
  async function fetchTransactionDetail(): Promise<void> {
    const res = (
      await axios.get(
        `https://magellan.columbus.camino.foundation/v2/transactions/${
          location.pathname.split('/')[4]
        }`,
      )
    ).data;
    let transaction: XPTransaction = {
      id: res.id,
      // status: 'accepted', //TODO: set dynamically when magellan delivers this information
      type: res.type,
      timestamp: new Date(Date.parse(res.timestamp)),
      from: getInputFunds(res),
      to: getOutputFunds(res),
      fee: res.txFee,
      inputTotals: res.inputTotals,
      outputTotals: res.outputTotals,
      memo: convertMemo(res.memo),
    };
    setResult(transaction);
    setDetails({
      id: res.id,
      status: 'accepted', //TODO: set dynamically when magellan delivers this information
      type: res.type,
      timestamp: new Date(Date.parse(res.timestamp)),
      fee: res.txFee,
      memo: convertMemo(res.memo),
    });
  }

  useEffectOnce(() => {
    fetchTransactionDetail();
  });

  return (
    <Container maxWidth="xl">
      <Helmet>
        <title>P-TransactionDetails</title>
        <meta name="description" content="chain-overviewBlockDetails" />
      </Helmet>
      <Paper
        variant="outlined"
        square
        sx={{
          minHeight: '680px',
          width: 1,
          backgroundColor: 'primary.dark',
          borderRadius: '12px',
          borderWidth: '1px',
          borderColor: 'primary.light',
          borderStyle: 'solid',
          p: '1.5rem 2rem 1.5rem 2rem',
          [theme.breakpoints.down('md')]: {
            p: '1rem 1.5rem 1rem 1.5rem',
          },
        }}
      >
        <Grid container direction="column" sx={{ width: 1, gap: '20px' }}>
          <Grid
            item
            container
            alignItems="center"
            sx={{
              gap: '20px',
            }}
          >
            <Link to="/p-chain">
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  borderRadius: '25px',
                }}
              >
                <ArrowBackIosIcon sx={{ width: '20px', height: '25px' }} />
              </Button>
            </Link>
            <Typography variant="h5" component="h5" fontWeight="fontWeightBold">
              P-Chain Transaction
            </Typography>
          </Grid>
          {result && (
            <RowContainer
              type="transaction"
              content={result['id']}
              theme={theme}
              head={true}
              parent
            />
          )}
          <Grid
            item
            container
            alignItems="center"
            sx={{ border: 'solid 1px', borderColor: 'card.border' }}
          >
            {details &&
              Object.entries(details).map((item, index) => {
                if (index === 0) return <div key={index}></div>;
                return (
                  <Grid key={index} item xs={12} md={12} lg={12} xl={12}>
                    <RowContainer
                      type={item[0]}
                      content={item[1]}
                      head={false}
                      theme={theme}
                      parent
                      //   parent={parseInt(location.pathname.split('/')[3]) - 1}
                    />
                    {item[0] === 'memo' && (
                      <Grid
                        sx={{ gap: '20px', padding: '1rem 2rem' }}
                        container
                        item
                        xs={12}
                        md={12}
                        lg={12}
                        xl={12}
                      >
                        <Grid
                          sx={{
                            height: 'auto',
                            padding: '1rem 1rem',
                          }}
                          item
                          xs={12}
                          md
                          lg
                          xl
                          container
                          alignItems="start"
                        >
                          {result?.from.map(item => (
                            <>
                              <InputCard
                                adress={item.address}
                                signature={item.signature}
                                value={item.value}
                              />
                            </>
                          ))}
                        </Grid>
                        <Grid
                          sx={{
                            height: 'auto',
                            padding: '1rem 1rem',
                          }}
                          item
                          xs={12}
                          md
                          lg
                          xl
                          container
                          alignItems="start"
                        >
                          {result?.to.map(item => (
                            <>
                              <OutputCard
                                adress={item.address}
                                value={item.value}
                              />
                            </>
                          ))}
                        </Grid>
                      </Grid>
                    )}

                    {index !== Object.entries(details).length - 1 && (
                      <Divider variant="fullWidth" />
                    )}
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          sx={{
            gap: '20px',
            mt: '10px',
          }}
          md
          lg
        >
          <Link style={{ textDecoration: 'none' }} to={'/x-chain'}>
            <MainButton variant="outlined">Back</MainButton>
          </Link>
        </Grid>
      </Paper>
    </Container>
  );
}

const InputCard = ({
  adress,
  signature,
  value,
}: {
  adress: string;
  signature: string;
  value: number;
}) => {
  return (
    <Paper
      sx={{
        width: 1,
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
        value={adress}
        type="string"
        icon="icon"
        tooltip="Fee"
        allowCopy={true}
      />
      <DetailsField
        field="Signature"
        value={signature}
        type="string"
        icon="icon"
        tooltip="Fee"
      />
      <DetailsField
        field="Value"
        value={value}
        type="gwei"
        icon="icon"
        tooltip="Fee"
      />
    </Paper>
  );
};

const OutputCard = ({ adress, value }: { adress: string; value: number }) => {
  return (
    <Paper
      sx={{
        width: 1,
        marginBottom: '1rem',
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
        value={adress}
        type="string"
        icon="icon"
        tooltip="Fee"
        allowCopy={true}
      />
      <DetailsField
        field="Value"
        value={value}
        type="gwei"
        icon="icon"
        tooltip="Fee"
      />
    </Paper>
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
