import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Grid,
} from '@mui/material';
import * as React from 'react';
import { mdiCubeOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Divider from '@mui/material/Divider';

export interface BlockTableData {
  number: number;
  timestamp: string;
  numberOfTransactions: number;
  hash: string;
  gasUsed?: number;
  gasLimit?: number;
  blockCost: number;
}

export function ListCard(props: {
  title: string;
  items: Array<BlockTableData>;
}) {
  console.log(props.items.length);
  return (
    <Box
      sx={{
        backgroundColor: 'primary.dark',
        borderRadius: '12px',
        borderWidth: '1px',
        borderColor: 'primary.light',
        borderStyle: 'solid',
        marginTop: '2rem',
        p: '1rem 0.5rem',
      }}
    >
      {props.title && (
        <Typography
          variant="h5"
          component="h5"
          fontWeight="fontWeightBold"
          sx={{ padding: '0rem 1.5rem 2rem 1.5rem' }}
        >
          {props.title}
        </Typography>
      )}
      {props.items.length > 0 ? (
        <List sx={{ width: '100%' }}>
          {props.items.map((item, index) => (
            <>
              <ListItem
                key={index}
                alignItems="flex-start"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr 4fr 2fr',
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'icon.background',
                      borderRadius: '12px',
                      minWidth: '50px',
                      minHeight: '50px',
                      width: '50px',
                      height: '50px',
                    }}
                  >
                    <Icon path={mdiCubeOutline} size={1} color="icon.color" />
                  </ListItemIcon>
                  <Box sx={{}}>
                    <Typography variant="body1">{item.number}</Typography>
                    <Typography variant="body1">{item.timestamp}</Typography>
                  </Box>
                  <Box sx={{}}>
                    <Typography variant="body1">
                      {item.numberOfTransactions} txs
                    </Typography>
                    <Typography variant="body1">{item.hash}</Typography>
                  </Box>
                  <Box sx={{}}>
                    <Typography variant="body1">{item.gasUsed}</Typography>
                  </Box>
                </Box>
              </ListItem>
              {index !== props.items.length - 1 && (
                <Divider variant="fullWidth" />
              )}
            </>
          ))}
        </List>
      ) : (
        <Typography variant="body1" component="p">
          No items
        </Typography>
      )}
    </Box>
  );
}

export function BlockList() {
  return <ListCard title="Latest Blocks" items={Blocks} />;
}

export function CTransactionList() {
  return <div>CTransactionList</div>;
}

export function LatestBlocksAndTransactionsList() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <BlockList />
      </Grid>
      <Grid item xs={12} md={6}>
        <BlockList />
      </Grid>
    </Grid>
  );
}

const Blocks = [
  {
    hash: '0x2ef924...747870',
    number: 335115,
    timestamp: '2s',
    gasLimit: 8000000,
    gasUsed: 233084,
    numberOfTransactions: 1,
    blockCost: 11654200000000000,
  },
  {
    hash: '0x2ef924...747870',
    number: 335115,
    timestamp: '3s',
    gasLimit: 8000000,
    gasUsed: 233084,
    numberOfTransactions: 1,
    blockCost: 11654200000000000,
  },
  {
    hash: '0x2ef924...747870',
    number: 335115,
    timestamp: '5s',
    gasLimit: 8000000,
    gasUsed: 233084,
    numberOfTransactions: 1,
    blockCost: 11654200000000000,
  },
  {
    hash: '0x2ef924...747870',
    number: 335115,
    timestamp: '7s',
    gasLimit: 8000000,
    gasUsed: 233084,
    numberOfTransactions: 1,
    blockCost: 11654200000000000,
  },
  {
    hash: '0x2ef924...747870',
    number: 335115,
    timestamp: '20s',
    gasLimit: 8000000,
    gasUsed: 233084,
    numberOfTransactions: 1,
    blockCost: 11654200000000000,
  },
  {
    hash: '0x2ef924...747870',
    number: 335115,
    timestamp: '50s',
    gasLimit: 8000000,
    gasUsed: 233084,
    numberOfTransactions: 1,
    blockCost: 11654200000000000,
  },
  {
    hash: '0x2ef924...747870',
    number: 335115,
    timestamp: '1min',
    gasLimit: 8000000,
    gasUsed: 233084,
    numberOfTransactions: 1,
    blockCost: 11654200000000000,
  },
  {
    hash: '0x2ef924...747870',
    number: 335115,
    timestamp: '1min',
    gasLimit: 8000000,
    gasUsed: 233084,
    numberOfTransactions: 1,
    blockCost: 11654200000000000,
  },
  {
    hash: '0x2ef924...747870',
    number: 335115,
    timestamp: '1min',
    gasLimit: 8000000,
    gasUsed: 233084,
    numberOfTransactions: 1,
    blockCost: 11654200000000000,
  },
  {
    hash: '0x2ef924...747870',
    number: 335115,
    timestamp: '2min',
    gasLimit: 8000000,
    gasUsed: 233084,
    numberOfTransactions: 1,
    blockCost: 11654200000000000,
  },
];
