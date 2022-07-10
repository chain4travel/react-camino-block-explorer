import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import * as React from 'react';
import { mdiCubeOutline } from '@mdi/js';
import Icon from '@mdi/react';
import ContentCopySharpIcon from '@mui/icons-material/ContentCopySharp';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LaunchSharpIcon from '@mui/icons-material/LaunchSharp';
import { CamAmount } from 'app/components/CamAmount';
import { Link } from 'react-router-dom';

function getNameFromType(type: string): string {
  switch (type) {
    case 'transaction':
      return 'Transaction';
    case 'hash':
      return 'Block';
    case 'number':
      return 'Number';
    case 'parentHash':
      return 'Parent Hash';
    case 'baseGaseFee':
      return 'Base Gas Fee';
    case 'fees':
      return 'Fees';
    case 'gasUsed':
      return 'Gas Used';
    case 'time':
      return 'Timestamp';
    case 'transactionsCount':
      return 'Transaction Count';
    case 'extData':
      return 'Extra Data';
    //transaction
    //firstPart
    case 'type':
      return 'Type';
    case 'createdAt':
      return 'Date';
    case 'fromAddr':
      return 'From';
    case 'toAddr':
      return 'To';
    case 'block':
      return 'Block';
    //secondPart
    case 'maxFeePerGas':
      return 'Max fee per gas';
    case 'maxPriorityFeePerGas':
      return 'Max Priority fee per gas';
    case 'effectiveGasPrice':
      return 'Effective Gas Price';
    case 'transactionCost':
      return 'Transaction Cost';
    //p-x-chain
    case 'id':
      return 'Id';
    case 'timestamp':
      return 'Timestamp';
    case 'fee':
      return 'Fee';
    case 'status':
      return 'Status';
    case 'memo':
      return 'Memo';
  }
  return '';
}
function checkWei(type: string): boolean {
  if (
    type === 'maxFeePerGas' ||
    type === 'maxPriorityFeePerGas' ||
    type === 'effectiveGasPrice' ||
    type === 'baseGaseFee' ||
    type === 'transactionCost' ||
    type === 'fees' ||
    type === 'fee'
  )
    return true;
  return false;
}

function checkHash(type: string): boolean {
  if (
    type === 'hash' ||
    type === 'parentHash' ||
    type === 'transaction' ||
    type === 'toAddr' ||
    type === 'block' ||
    type === 'id' ||
    type === 'fromAddr'
  )
    return true;
  return false;
}

export function RowContainer({ theme, head, type, content, parent }) {
  const isMobile = useMediaQuery('@media (max-width:899px)');
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      item
      sx={{
        backgroundColor: head && 'latestList.iconBackground',
        p: '.8rem',
        gap: '10px',
        border: head === true ? 'solid 1px' : '0px',
        borderColor: 'overviewCard.border',
      }}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        item
        xs={12}
        md={3}
        lg={3}
        xl={3}
        sx={{ gap: '20px' }}
      >
        {!isMobile && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'latestList.iconBackground',
              borderRadius: '12px',
              minWidth: '40px',
              minHeight: '40px',
              width: '40px',
              height: '40px',
            }}
          >
            {head ? (
              <Icon
                path={mdiCubeOutline}
                size={1}
                color="latestList.iconColor"
              />
            ) : (
              <HelpOutlineOutlinedIcon />
            )}
          </Box>
        )}
        {/* {React.createElement(Typography, { variant: 'body1' }, 'bigola')} */}
        <Typography variant="body1">{getNameFromType(type)}</Typography>
      </Grid>
      {type !== 'memo' ? (
        <Grid item xs={12} md lg xl>
          {checkWei(type) ? (
            <Grid
              item
              container
              xs={12}
              sx={{ gap: '5px' }}
              md
              alignItems="center"
            >
              <CamAmount amount={parseInt(content)} />
            </Grid>
          ) : (
            <Typography variant="body1" noWrap>
              {content.toLocaleString('en-US')}
            </Typography>
          )}
        </Grid>
      ) : (
        <Grid item xs={12} md lg xl>
          Discord faucet UID: 975692841227534347
        </Grid>
      )}
      {type === 'memo' && (
        <Grid
          sx={{ gap: '20px' }}
          container
          item
          xs={12}
          md={12}
          lg={12}
          xl={12}
        >
          <Grid
            sx={{
              backgroundColor: 'overviewCard.border',
              height: 'auto',
              padding: '1rem 1rem',
            }}
            item
            xs={12}
            md
            lg
            xl
            container
          >
            <Typography sx={{ margin: '1rem' }} variant="body1">
              Input
            </Typography>
            <RowContainer
              parent
              theme={theme}
              head={false}
              type="hash"
              content="ahah"
            />
          </Grid>
          <Grid sx={{ backgroundColor: 'blue' }} item xs={12} md lg xl></Grid>
        </Grid>
      )}
      {checkHash(type) && (
        <Grid
          container
          item
          xs={12}
          md={2}
          lg={2}
          xl={2}
          justifyContent="end"
          sx={{
            paddingRight: '5px',
            [theme.breakpoints.down('md')]: {
              justifyContent: 'start',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '12px',
              minWidth: '40px',
              minHeight: '40px',
              gap: '10px',
            }}
          >
            {(type === 'parentHash' || type === 'block') && (
              <Link
                style={{ textDecoration: 'none' }}
                to={`/c-chain/blocks/${parent}`}
                replace={true}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    borderRadius: '25px',
                  }}
                >
                  <LaunchSharpIcon sx={{ fontSize: '16px' }} />
                  <p style={{ fontSize: '10px', marginLeft: '5px' }}>open</p>
                </Button>
              </Link>
            )}
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                borderRadius: '25px',
              }}
            >
              <ContentCopySharpIcon sx={{ fontSize: '16px' }} />
            </Button>
          </Box>
        </Grid>
      )}
    </Grid>
  );
}
