import * as React from 'react';
import {
  Grid,
  Paper,
  Typography,
  useTheme,
  Box,
  TableContainer,
  TableCellProps,
  TableRow,
  TableCell,
} from '@mui/material';
import PageContainer from 'app/components/PageContainer';
import BackButton from 'app/components/BackButton';
import CutomTable from 'app/components/Table/CustomTable';
import useWidth from 'app/hooks/useWidth';
import { getRelativeTime } from 'utils/display-utils';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { selectAllValidators } from 'store/validatorsSlice';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import { loadValidators } from 'store/validatorsSlice/utils';
import { Field } from 'app/components/DetailsField';
import { ValidatorType } from 'types/store';
import SubPageTitle from 'app/components/SubPageTitle';
import Chip from '@mui/material/Chip';

export default function Validators() {
  const theme = useTheme();
  const { isDesktop, isWidescreen } = useWidth();
  const validators = useAppSelector(selectAllValidators);
  const dispatch = useAppDispatch();
  useEffectOnce(() => {
    dispatch(loadValidators());
  });

  return (
    <PageContainer pageTitle="Validators" metaContent="validators">
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
        <SubPageTitle title="Validators" style={{ marginBottom: '20px' }} />
        <TableContainer sx={{ height: '650px' }}>
          {isWidescreen || isDesktop ? (
            <CutomTable columns={columns}>
              {validators?.map(validator => (
                <CustomRow key={validator.nodeID} validator={validator} />
              ))}
            </CutomTable>
          ) : (
            <Grid item container alignItems="center">
              {validators.map(validator => (
                <GridItem key={validator.nodeID} validator={validator} />
              ))}
            </Grid>
          )}
        </TableContainer>
        <Box sx={{ display: 'flex', width: '100%', paddingTop: '1rem' }}>
          <BackButton />
        </Box>
      </Paper>
    </PageContainer>
  );
}

export interface ColumnType {
  name: string;
  label: string;
  field: string;
  align: TableCellProps['align'];
}

const columns: ColumnType[] = [
  {
    name: 'Status',
    label: 'Status',
    field: 'Status',
    align: 'center',
  },
  {
    name: 'NodeID',
    label: 'NodeID',
    field: 'NodeID',
    align: 'center',
  },
  {
    name: 'StartTime',
    label: 'StartTime',
    field: 'StartTime',
    align: 'center',
  },
  {
    name: 'EndTime',
    label: 'EndTime',
    field: 'EndTime',
    align: 'center',
  },
  {
    name: 'UpTime',
    label: 'UpTime',
    field: 'UpTime',
    align: 'center',
  },
  {
    name: 'txID',
    label: 'txID',
    field: 'txID',
    align: 'center',
  },
];

const CustomRow = ({ validator }: { validator: ValidatorType }) => {
  return (
    <TableRow>
      <TableCell
        align="left"
        sx={{ maxWidth: { xs: '10px', md: '100px', lg: '80px' } }}
      >
        <Chip
          label={validator.status}
          color={validator.status === 'Connected' ? 'success' : 'error'}
          sx={{ borderRadius: '7px' }}
        />
      </TableCell>
      <TableCell
        sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
        align="center"
      >
        <Field type="string" value={validator.nodeID} />
      </TableCell>
      <TableCell align="center">
        {getRelativeTime(validator.startTime) + ' ago '}
      </TableCell>
      <TableCell align="center">
        {getRelativeTime(validator.endTime) + ' ago '}
      </TableCell>
      <TableCell align="center">
        <Field type="string" value={validator.uptime} />
      </TableCell>
      <TableCell
        sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
        align="center"
      >
        <Field type="string" value={validator.txID} />
      </TableCell>
    </TableRow>
  );
};

const GridItem = ({ validator }: { validator: ValidatorType }) => {
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
          Status
        </Typography>
        <Chip
          label={validator.status}
          color={validator.status === 'Connected' ? 'success' : 'error'}
          sx={{ borderRadius: '7px' }}
        />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          NodeID
        </Typography>
        <Field type="string" value={validator.nodeID} />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          StartTime
        </Typography>
        {getRelativeTime(validator.startTime) + ' ago '}
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          EndTime
        </Typography>
        {getRelativeTime(validator.endTime) + ' ago '}
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          UpTime
        </Typography>
        <Field type="string" value={validator.uptime} />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          txID
        </Typography>
        <Field type="string" value={validator.txID} />
      </Grid>
    </Paper>
  );
};

// const Badge = {
//   color,
//   textColor,
//   floating,
//   transparent,
//   multiLine,
//   label,
//   align,
//   outline,
//   rounded,
// };
