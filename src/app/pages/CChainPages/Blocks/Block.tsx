import { Grid, Paper, TableCell, TableRow, Typography } from '@mui/material';
import AddressLink from 'app/components/AddressLink';
import { Field } from 'app/components/DetailsField';
import useWidth from 'app/hooks/useWidth';
import React from 'react';
import { getRelativeTime } from 'utils/display-utils';
import { BlockType } from '.';

interface Props {
  block: BlockType;
}
export type Ref = any;

const Block = React.forwardRef<Ref, Props>((props, ref) => {
  const blockBody = <CustomRow block={props.block} />;
  const { isDesktop, isWidescreen } = useWidth();
  let content;
  if (isDesktop || isWidescreen)
    content = ref ? (
      <TableRow ref={ref}>{blockBody}</TableRow>
    ) : (
      <TableRow>{blockBody}</TableRow>
    );
  else
    content = ref ? (
      <div ref={ref}>
        <GridItem block={props.block} />
      </div>
    ) : (
      <div>
        <GridItem block={props.block} />
      </div>
    );
  return content;
});

export default Block;

const GridItem = ({ block }) => {
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
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Block
        </Typography>
        <AddressLink
          to={`${block.number}`}
          value={block.number}
          typographyVariant="body1"
          truncate={false}
        />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Age
        </Typography>
        <Field type={'timestamp'} value={block.timestamp.toString()}></Field>
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          # of tx
        </Typography>
        <Field type="number" value={block.numberOfTransactions} />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          hash
        </Typography>
        <Field type="number" value={block.hash} />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Gas Used
        </Typography>
        <Field type="string" value={block.gasUsed?.toString()} />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Gas Limit
        </Typography>
        <Field type="string" value={block.gasLimit?.toString()} />
      </Grid>
    </Paper>
  );
};

const CustomRow = ({ block }) => {
  return (
    <>
      <TableCell>
        <AddressLink
          to={`${block.number}`}
          value={block.number}
          typographyVariant="body1"
          truncate={false}
        />
      </TableCell>
      <TableCell align="left">
        <Typography variant="body2" component="span" noWrap={true}>
          {getRelativeTime(block.timestamp) + ' ago '}
        </Typography>
      </TableCell>
      <TableCell sx={{ maxWidth: '50px' }} align="center">
        <Field type="number" value={block.numberOfTransactions} />
      </TableCell>
      <TableCell
        align="center"
        sx={{ maxWidth: { xs: '180px', md: '300px', lg: 'fit' } }}
      >
        <Field type="string" value={block.hash} />
      </TableCell>
      <TableCell align="right">
        <Field type="string" value={block.gasUsed?.toString()} />
      </TableCell>
      <TableCell align="right">
        <Field type="string" value={block.gasLimit?.toString()} />
      </TableCell>
    </>
  );
};
