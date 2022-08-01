import React, { FC } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { mdiCubeOutline } from '@mdi/js';
import { GasAmount } from '../../../../components/CamAmount';
import { BlockTableData } from 'types/block';
import Icon from '@mdi/react';
import AddressLink from '../../../../components/AddressLink';
import RelativeTime from '../../../../components/RelativeTime';
import useWidth from 'app/hooks/useWidth';

interface BlockItemProps {
  block: BlockTableData;
  to: string;
}

const BlockItem: FC<BlockItemProps> = ({ block, to }) => {
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

export default BlockItem;
