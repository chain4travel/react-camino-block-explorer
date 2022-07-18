import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material';
import useWidth from 'app/hooks/useWidth';

function OutlinedSearchInput() {
  return (
    <OutlinedInput
      placeholder="Search by Address / Hash / Block / Token"
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        p: '8px 16px',
        backgroundColor: 'primary.light',
        color: 'primary.contrastText',
        borderWidth: '0px',
        fontSize: '15px',
        lineHeight: '24px',
        fontWeight: 400,
        '.MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
      }}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
    />
  );
}

export default function SearchInput() {
  const { isDesktop } = useWidth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();

  return (
    <>
      {!isDesktop ? (
        <div>
          <SearchIcon
            onClick={handleOpen}
            sx={{
              color: 'primary.contrastText',
            }}
          />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'primary.dark',
                boxShadow: 24,
                width: '100%',
                maxWidth: '50%',
                minWidth: '50%',
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                borderRadius: '10px',
                height: '40px',
                [theme.breakpoints.down('md')]: {
                  maxWidth: '100%',
                },
              }}
            >
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Search for anything
              </Typography>
              <OutlinedSearchInput />
            </Box>
          </Modal>
        </div>
      ) : (
        <Box
          sx={{
            width: '450px',
            height: '40px',
            '@media (max-width:1024px)': {
              width: '325px',
            },
          }}
        >
          <OutlinedSearchInput />
        </Box>
      )}
    </>
  );
}
