import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function OutlinedSearchInput() {
  return (
    <OutlinedInput
      placeholder="Search by Address / Hash / Block / Token"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
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
        '@media (max-width: 1024px)': {
          height: '50px',
        },
      }}
    />
  );
}

export default function SearchInput() {
  const isMobile = useMediaQuery('@media (max-width:1024px)');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {isMobile ? (
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
            <Box sx={moadalStyle}>
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
            width: '480px',
            height: '40px',
          }}
        >
          <OutlinedSearchInput />
        </Box>
      )}
    </>
  );
}

const moadalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'primary.dark',
  boxShadow: 24,
  width: '100%',
  maxWidth: '50%',
  minWidth: '400px',
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '10px',
  '@media (max-width:600px)': {
    maxWidth: '100%',
  },
};
