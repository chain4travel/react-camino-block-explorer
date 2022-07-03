import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import * as React from 'react';
import { mdiCubeOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Divider from '@mui/material/Divider';
import { ReactComponent as GasStationOutline } from './assets/gas-station-outline.svg';
import { getDisplayAmount } from '../../../utils/currency/currency-utils';
import { getRelativeTime } from '../../../utils/display/display-utils';
import OutlinedButton from '../OutlinedButton';
import { Link } from 'react-router-dom';

export interface BlockTableData {
  number: number;
  timestamp: number;
  numberOfTransactions: number;
  hash: string;
  gasUsed: number;
  gasLimit?: number;
  blockCost: number;
}

// create camAmount component
const CamAmount = ({ amount }: { amount: number }) => {
  return (
    <>
      <Typography variant="body1">
        {getDisplayAmount(amount).value.toLocaleString('en-US')}
      </Typography>
      <GasStationOutline
        style={{
          width: '26px',
          height: '26px',
          marginLeft: '5px',
        }}
      />
    </>
  );
};

export function ListCard({
  title,
  items,
  to,
}: {
  title: string;
  items: Array<BlockTableData>;
  to: string;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery('@media (max-width:899px)');
  console.log(
    'timestamp',
    getRelativeTime(new Date(items[0].timestamp * 1000)),
  );
  return (
    <Paper
      variant="outlined"
      square
      sx={{
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
      {title && (
        <Typography
          variant="h5"
          component="h5"
          fontWeight="fontWeightBold"
          sx={{ paddingBottom: '1rem' }}
        >
          {title}
        </Typography>
      )}
      {items.length > 0 ? (
        <>
          {items.map((item, index) => (
            <div key={index}>
              <Grid
                container
                rowSpacing={2}
                justifyContent="space-between"
                sx={{ padding: '0.5rem 0rem 0.5rem 0rem' }}
              >
                {!isMobile && (
                  <Grid item xs="auto" sx={{ paddingRight: '5px' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'latestList.iconBackground',
                        borderRadius: '12px',
                        minWidth: '50px',
                        minHeight: '50px',
                        width: '50px',
                        height: '50px',
                      }}
                    >
                      <Icon
                        path={mdiCubeOutline}
                        size={1}
                        color="latestList.iconColor"
                      />
                    </Box>
                  </Grid>
                )}
                <Grid item xs={12} md={2} justifyContent="flex-start">
                  {/* // Todo: create a component that redirects to the correct page if it's a link */}
                  <Typography variant="body1" color="latestList.blockNumber">
                    {item.number}
                  </Typography>
                  <Typography variant="subtitle2" color="latestList.timestamp">
                    {getRelativeTime(item.timestamp) + ' ago'}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={5} xl={6}>
                  <Typography variant="body1">
                    {item.numberOfTransactions} txs
                  </Typography>
                  <Typography variant="body1" noWrap={true}>
                    {item.hash}
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  md={2}
                  lg={3}
                  xl={2}
                  alignItems="center"
                  justifyContent={isMobile ? 'flex-start' : 'flex-end'}
                >
                  <CamAmount amount={item.gasUsed} />
                </Grid>
              </Grid>
              {index !== items.length - 1 && <Divider variant="fullWidth" />}
            </div>
          ))}
        </>
      ) : (
        <Typography variant="body1" component="p">
          No items
        </Typography>
      )}
      <Box
        sx={{
          marginTop: '1rem',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link style={{ textDecoration: 'none' }} to={to}>
          <OutlinedButton>View Block</OutlinedButton>
        </Link>
      </Box>
    </Paper>
  );
}

export function LatestBlocksAndTransactionsList({ blocks, transactions }) {
  return (
    <Grid
      container
      rowSpacing={{ xs: 4, lg: '0!important' }}
      columnSpacing={{ xs: 0, lg: 4 }}
    >
      <Grid item xs={12} lg={6}>
        <ListCard title="Latest Blocks" items={blocks} to="/c-chain/blocks" />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ListCard
          title="Latest Transactions"
          items={blocks}
          to="/transactions"
        />
      </Grid>
    </Grid>
  );
}
