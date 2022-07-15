import * as React from 'react';
import {
  Paper,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import PageContainer from 'app/components/PageContainer';
import CopyAddressTitle from 'app/components/CopyAddressTitle';
import TabsHeader from 'app/components/TabComponent/TabsHeader';
import TabPanel from 'app/components/TabComponent/TabPanel';
import Chip from 'app/components/Chip';
import useWidth from 'app/hooks/useWidth';
import { Field } from 'app/components/DetailsField';
import { getRelativeTime } from 'utils/display-utils';
import { BlockTableData } from 'types/block';
import BackButton from 'app/components/BackButton';

const tabOptions = [
  {
    label: 'Transactions',
    value: 'transactions',
  },
  {
    label: 'Blocks',
    value: 'blocks',
  },
];

export default function CAddressDetails() {
  // getting the address from the url by getting what comes after the last slash
  const address = window.location.pathname.split('/').pop() as string;
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <PageContainer
      pageTitle="C Address Detail"
      metaContent="chain-overview c-chain"
    >
      <PageTitle title="Address Detail" />
      <CopyAddressTitle showAddressLabel={true} value={address} />
      <Paper square variant="outlined" sx={{ backgroundColor: 'primary.dark' }}>
        <TabsHeader
          tabValue={value}
          changeAction={handleChange}
          tabOptions={tabOptions}
        >
          <Panels value={value} />
        </TabsHeader>
      </Paper>
    </PageContainer>
  );
}

////////////////////////////////////////////////////////////////////////////

const PageTitle = ({ title }) => {
  return (
    <Grid
      item
      container
      alignItems="center"
      sx={{
        gap: '20px',
      }}
    >
      <BackButton />
      <Typography variant="h5" component="h5" fontWeight="fontWeightBold">
        {title}
      </Typography>
    </Grid>
  );
};

////////////////////////////////////////////////////////////////////////////

const Panels = ({ value }: { value: number }) => {
  const { isDesktop, isWidescreen } = useWidth();
  const tableEl = React.useRef<HTMLDivElement>(null);
  const [rows, setRows] = React.useState<BlockTableData[]>([]);
  // const tx = `https://magellan.columbus.camino.foundation/v2/cblocks?address=0x0ef715db81323d3a88c42c5e19a7f6a4c5b5c613&limit=0&limit=50`;

  return (
    <>
      <TabPanel value={value} index={0}>
        {/* loop on the transactions */}
        <Grid container>
          <TableContainer ref={tableEl} sx={{ height: '750px' }}>
            {isWidescreen || isDesktop ? (
              <CustomTable rows={rows} columns={columns} />
            ) : (
              <SmallSizes rows={rows} />
            )}
          </TableContainer>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
    </>
  );
};

////////////////////////////////////////////////////////////////////////////

const SmallSizes = ({ rows }) => {
  return (
    <Grid item container alignItems="center">
      {rows.length > 0 &&
        rows.map((row, index) => {
          return (
            <Paper
              key={index}
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
                  Hash
                </Typography>
                <Field type="string" value={row.hash} />
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  From
                </Typography>
                value={row.to[0]?.address ? row.from[0]?.address : 'NaN'}
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  To
                </Typography>
                value={row.to[0]?.address ? row.to[0]?.address : 'NaN'}
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  Timestamp
                </Typography>
                {getRelativeTime(row.timestamp as number) + ' ago '}
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  Type
                </Typography>
                <Chip
                  label={row.type}
                  style={{
                    minWidth: '61px',
                    height: 'min-content',
                    backgroundColor: '#0F172A',
                  }}
                />
              </Grid>
              <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                  Fee
                </Typography>
                <Field type="gwei" value={row.fee} />
              </Grid>
            </Paper>
          );
        })}
    </Grid>
  );
};

////////////////////////////////////////////////////////////////////////////

const CustomTable = ({ rows, columns }) => {
  return (
    <>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                sx={{ backgroundColor: 'primary.dark', wrap: 'nowrap' }}
                key={column.name}
                align={column.align}
              >
                <Field type="string" value={column.label} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => {
            return (
              <TableRow key={index}>
                <TableCell
                  align="center"
                  sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
                >
                  <Field type="string" value={row.hash} />
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
                >
                  <Field
                    type="string"
                    value={row.from[0]?.address ? row.from[0]?.address : 'NaN'}
                  />
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ maxWidth: { xs: '10px', md: '80px', lg: '140px' } }}
                >
                  <Field
                    type="string"
                    value={row.to[0]?.address ? row.to[0]?.address : 'NaN'}
                  />
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" component="span" noWrap={true}>
                    {getRelativeTime(row.timestamp as number) + ' ago '}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Chip
                    label={row.type}
                    style={{ minWidth: '61px', height: 'min-content' }}
                  />
                </TableCell>
                <TableCell align="left">
                  <Field type="gwei" value={row.fee} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

////////////////////////////////////////////////////////////////////////////

const columns = [
  {
    name: 'direction',
    label: 'In/Out',
    field: 'direction',
    align: 'center',
  },
  {
    name: 'txnHash',
    label: 'Txn Hash',
    field: 'txnHash',
    align: 'center',
    type: 'hash',
    // detailsLink: detailsLink,
  },
  {
    name: 'block',
    label: 'Block',
    field: 'block',
    align: 'center',
  },
  {
    name: 'age',
    label: 'Age',
    field: 'age',
    align: 'center',
    type: 'timestamp',
  },
  {
    name: 'from',
    label: 'From',
    field: 'from',
    align: 'center',
    type: 'hash',
    // detailsLink: getAddressDetailsPath,
  },
  {
    name: 'to',
    label: 'To',
    field: 'to',
    align: 'center',
    type: 'hash',
    // detailsLink: getAddressDetailsPath,
  },
  {
    name: 'value',
    label: 'Value',
    field: 'value',
    align: 'center',
    type: 'currency',
  },
  {
    name: 'txnFee',
    label: 'Txn Fee',
    field: 'txnFee',
    align: 'center',
    type: 'currency',
  },
];
