import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import * as React from 'react';
import { mdiCubeOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import AddressLink from '../AddressLink';
import { GasAmount } from '../CamAmount';
import MainButton from '../MainButton';
import RelativeTime from '../RelativeTime';
import { BlockTableData } from 'types/block';
import useWidth from 'app/hooks/useWidth';

export default function BlockList({
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
              <BlockItem block={item} to={to} />
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
      <ShowAll toLink="/all/c-chain/blocks" />
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

const BlockItem = ({ block, to }) => {
  const { isMobile, isTablet } = useWidth();
  return (
    <Grid
      container
      rowSpacing={2}
      justifyContent="space-between"
      sx={{ padding: '0.5rem 0rem 0.5rem 0rem' }}
    >
      {!isMobile && !isTablet && (
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
            <Icon path={mdiCubeOutline} size={1} color="latestList.iconColor" />
          </Box>
        </Grid>
      )}
      <Grid item xs={12} md={2} justifyContent="flex-start">
        <AddressLink
          to={`${to}/${block.number}`}
          value={block.number}
          typographyVariant="body1"
          truncate={false}
        />
        <RelativeTime value={block.timestamp} variant="subtitle2" />
      </Grid>
      <Grid item xs={12} md={6} lg={5} xl={6}>
        <Typography variant="body1">
          {block.numberOfTransactions} txs
        </Typography>
        <Typography variant="body1" noWrap={true}>
          {block.hash}
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
        justifyContent={isMobile && isTablet ? 'flex-start' : 'flex-end'}
      >
        <GasAmount amount={block.gasUsed as number} />
      </Grid>
    </Grid>
  );
};
