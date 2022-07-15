import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  CircularProgress,
} from '@mui/material';
import * as React from 'react';
import Icon from '@mdi/react';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import AddressLink from '../AddressLink';
import { CamAmount } from '../CamAmount';
import MainButton from '../MainButton';
import RelativeTime from '../RelativeTime';
import { CTransaction } from 'types/transaction';
import useWidth from 'app/hooks/useWidth';
import { mdiTransfer } from '@mdi/js';

export default function TransactionsList({
  title,
  items,
  to,
  link,
}: {
  title: string;
  items: Array<CTransaction>;
  to: string;
  link: boolean;
}) {
  const theme = useTheme();
  return (
    <Paper
      variant="outlined"
      square
      sx={{
        backgroundColor: 'primary.dark',
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
            <React.Fragment key={index}>
              <TransactionItem tx={item} to={to} />
              {index !== items.length - 1 && <Divider variant="fullWidth" />}
            </React.Fragment>
          ))}
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            height: '600px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      {link && <ShowAll toLink="/all/c-chain/transactions" />}
    </Paper>
  );
}

const ShowAll = ({ toLink }: { toLink: string }) => {
  return (
    <Box
      sx={{
        marginTop: '1rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link style={{ textDecoration: 'none' }} to={toLink}>
        <MainButton variant="outlined">Show All</MainButton>
      </Link>
    </Box>
  );
};

const TransactionItem = ({ tx, to }) => {
  const { isMobile, isTablet } = useWidth();
  return (
    <Grid
      container
      rowSpacing={{ xs: 1, md: 2 }}
      justifyContent="space-between"
      sx={{ padding: '0.5rem 0rem 0.5rem 0rem' }}
    >
      {!isMobile && !isTablet && (
        <Grid item xs="auto">
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
            <Icon path={mdiTransfer} size={1} color="latestList.iconColor" />
          </Box>
        </Grid>
      )}
      <Grid item xs={12} md={3} justifyContent="flex-start">
        <AddressLink
          to={`${to}/${tx.hash}`}
          value={tx.hash}
          typographyVariant="body1"
          truncate={true}
        />
        <RelativeTime value={tx.timestamp} variant="subtitle2" />
      </Grid>
      <Grid item xs={12} md={4} xl={5}>
        <Grid container direction="row">
          <Grid item xs={2} md={4} xl={3}>
            <Typography variant="subtitle2">From</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <AddressLink
              to={`address/${tx.from}`}
              value={tx.from}
              typographyVariant="body1"
              truncate={true}
            />
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item xs={2} md={4} xl={3}>
            <Typography variant="subtitle2">To</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <AddressLink
              to={`address/${tx.to}`}
              value={tx.to}
              typographyVariant="body1"
              truncate={true}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={3}
        xl="auto"
        alignItems="center"
        justifyContent={isMobile && isTablet ? 'flex-start' : 'flex-end'}
      >
        <CamAmount amount={tx.transactionCost} />
      </Grid>
    </Grid>
  );
};
