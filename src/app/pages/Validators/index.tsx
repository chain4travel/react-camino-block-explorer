import * as React from 'react';
import {
  Grid,
  Paper,
  useTheme,
  Box,
  TableContainer,
  TableCellProps,
} from '@mui/material';
import PageContainer from 'app/components/PageContainer';
import BackButton from 'app/components/BackButton';
import TableView from 'app/components/Table/TableView';
import useWidth from 'app/hooks/useWidth';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { selectAllValidators } from 'store/validatorsSlice';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import { loadValidators } from 'store/validatorsSlice/utils';
import SubPageTitle from 'app/components/SubPageTitle';
import { TableViewRow } from './/TableViewRow';
import { GridViewItem } from './GridViewItem';

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
            <TableView columns={columns}>
              {validators?.map(validator => (
                <TableViewRow key={validator.nodeID} validator={validator} />
              ))}
            </TableView>
          ) : (
            <Grid item container alignItems="center">
              {validators.map(validator => (
                <GridViewItem key={validator.nodeID} validator={validator} />
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
