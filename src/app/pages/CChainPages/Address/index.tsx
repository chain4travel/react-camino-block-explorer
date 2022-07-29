import React, { FC } from 'react';
import { Paper, Box, useTheme } from '@mui/material';
import { mdiFileDocumentOutline } from '@mdi/js';
import PageContainer from 'app/components/PageContainer';
import TabsHeader from 'app/components/TabComponent/TabsHeader';
import TabPanel from 'app/components/TabComponent/TabPanel';
import Transactions from './Transactions';
import SubPageTitle from 'app/components/SubPageTitle';
import useWidth from 'app/hooks/useWidth';
import { CCHAIN } from 'utils/route-paths';
import DetailsField from 'app/components/DetailsField';
import Icon from '@mdi/react';

const tabOptions = [
  {
    label: 'Transactions',
    value: 'transactions',
  },
];

const CAddressDetails: FC = () => {
  const { isDesktop } = useWidth();
  const theme = useTheme();
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
      <SubPageTitle title="Address Detail" backToLink={CCHAIN} />
      <Box
        sx={{
          backgroundColor: 'primary.dark',
          border: theme.palette.mode === 'dark' ? 'solid 1px' : '0px',
          borderColor: 'borders.main',
          borderRadius: '7px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <DetailsField
          field="Address"
          value={address}
          type="string"
          icon={
            <Icon
              path={mdiFileDocumentOutline}
              color="latestList.iconColor"
              style={{ width: '20px', height: '20px' }}
            />
          }
          allowCopy={true}
        />
      </Box>
      <Paper
        square
        variant="outlined"
        sx={{ backgroundColor: 'primary.dark', boxShadow: 'none' }}
      >
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
