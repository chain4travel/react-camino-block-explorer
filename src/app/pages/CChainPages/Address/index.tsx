import React, { FC } from 'react';
import { Paper } from '@mui/material';
import { mdiFileDocumentOutline } from '@mdi/js';
import PageContainer from 'app/components/PageContainer';
import CopyTitleCard from 'app/components/CopyTitleCard';
import TabsHeader from 'app/components/TabComponent/TabsHeader';
import TabPanel from 'app/components/TabComponent/TabPanel';
import Transactions from './Transactions';
import SubPageTitle from 'app/components/SubPageTitle';
import useWidth from 'app/hooks/useWidth';

const tabOptions = [
  {
    label: 'Transactions',
    value: 'transactions',
  },
];

const CAddressDetails: FC = () => {
  const { isDesktop } = useWidth();
  const [value, setValue] = React.useState(0);
  const address = window.location.pathname.split('/').pop() as string;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <PageContainer
      pageTitle="C Address Detail"
      metaContent="Address Detail C-Chain"
    >
      <SubPageTitle title="Address Detail" />
      <CopyTitleCard
        label="Address"
        value={address}
        icon={mdiFileDocumentOutline}
      />
      <Paper square variant="outlined" sx={{ backgroundColor: 'primary.dark' }}>
        <TabsHeader
          tabValue={value}
          changeAction={handleChange}
          tabOptions={tabOptions}
        >
          <TabPanel
            value={value}
            index={0}
            style={{ padding: isDesktop ? '0px' : '.7rem .7rem 0px .7rem' }}
          >
            <Transactions />
          </TabPanel>
        </TabsHeader>
      </Paper>
    </PageContainer>
  );
};

export default CAddressDetails;
