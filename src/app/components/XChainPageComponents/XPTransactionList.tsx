import React from 'react';
import { Paper, Typography, useTheme, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MainButton from '../MainButton';

export default function XPTransactionList({
  chainType,
  ShowAllLink,
  children,
}: {
  chainType?: string;
  ShowAllLink: string;
  children: React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        minHeight: '600px',
        backgroundColor: 'primary.dark',
        p: '1.5rem 2rem 1.5rem 2rem',
        [theme.breakpoints.down('md')]: {
          p: '1rem 1.5rem 1rem 1.5rem',
        },
      }}
    >
      <ListTitle style={{ paddingBottom: '1.5rem' }}>
        Latest Transactions
      </ListTitle>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
      <Link
        to={ShowAllLink}
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          textDecoration: 'none',
        }}
      >
        <MainButton variant="outlined">Show All</MainButton>
      </Link>
    </Paper>
  );
}

const ListTitle = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <Typography
      variant="h5"
      component="h5"
      fontWeight="fontWeightBold"
      sx={{ ...style }}
    >
      {children}
    </Typography>
  );
};
