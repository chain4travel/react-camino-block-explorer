import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import * as React from 'react';
import { mdiCubeOutline } from '@mdi/js';
import Icon from '@mdi/react';
import ContentCopySharpIcon from '@mui/icons-material/ContentCopySharp';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LaunchSharpIcon from '@mui/icons-material/LaunchSharp';
import { getRelativeTime } from 'utils/display/display-utils';
import {
  CamAmount,
  GasAmount,
} from 'app/components/LatestBlocksAndTransactionsList/CamAmount';
import { getDisplayAmount } from 'utils/currency/currency-utils';
import { Link } from 'react-router-dom';

function getNameFromType(type: string): string {
  switch (type) {
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
  }
  return '';
}
function getContentFromType(
  type: string,
  value: string,
): string | number | Date | any {
  switch (type) {
    case 'hash':
      return value;
    case 'number':
      return parseInt(value);
    case 'parentHash':
      return value;
    case 'baseGaseFee':
      return parseInt(value);
    case 'fees':
      return parseInt(value);
    //   return '0.12';
    case 'gasUsed':
      return getDisplayAmount(parseInt(value)).value.toLocaleString('en-US');
    //   return parseInt(value);
    case 'time':
      //   return `${getRelativeTime(
      //     new Date(parseInt(value) * 1000),
      //   )} ago    ${new Date(parseInt(value) * 1000)}`;
      return new Date(parseInt(value) * 1000);
    //   return 'pikala';
    case 'transactionsCount':
      return parseInt(value);
    case 'extData':
      return value;
  }
  return '';
}

export function RowContainer({ theme, head, type, content, parent }) {
  const isMobile = useMediaQuery('@media (max-width:899px)');
  console.log(parent);
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
        <Typography variant="body1">{getNameFromType(type)}</Typography>
      </Grid>
      <Grid item xs={12} md lg xl>
        {type === 'baseGaseFee' || type === 'fees' ? (
          <Grid item container xs={12} md alignItems="center">
            <CamAmount amount={parseInt(content)} />
          </Grid>
        ) : (
          <Typography variant="body1" noWrap>
            {getContentFromType(type, content).toString()}
          </Typography>
        )}
      </Grid>
      {(type === 'hash' || type === 'parentHash') && (
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
              // width: '40px',
              // height: '40px',
            }}
          >
            {type === 'parentHash' && (
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
