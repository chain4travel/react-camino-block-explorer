import * as React from 'react';
import { Paper, Grid, Typography } from '@mui/material';
import PageContainer from 'app/components/PageContainer';
import CopyAddressTitle from 'app/components/CopyAddressTitle';
import TabsHeader from 'app/components/TabComponent/TabsHeader';
import TabPanel from 'app/components/TabComponent/TabPanel';
import BackButton from 'app/components/BackButton';
import Transactions from './Transactions';

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
  return (
    <>
      <TabPanel value={value} index={0} style={{ padding: '0px' }}>
        <Transactions />
      </TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
    </>
  );
};
