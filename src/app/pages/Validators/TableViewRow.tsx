import * as React from 'react';
import { TableRow, TableCell, Chip } from '@mui/material';
import { getRelativeTime } from 'utils/display-utils';
import { Field } from 'app/components/DetailsField';
import { ValidatorType } from 'types/store';

export const TableViewRow = ({ validator }: { validator: ValidatorType }) => {
  return (
    <TableRow>
      <TableCell
        align="left"
        sx={{ maxWidth: { xs: '10px', md: '100px', lg: '80px' } }}
      >
        <Chip
          label={validator.status}
          color={validator.status === 'Connected' ? 'success' : 'error'}
          sx={{ borderRadius: '7px', color: 'grey.900' }}
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
