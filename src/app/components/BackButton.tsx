import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      variant="outlined"
      color="secondary"
      sx={{
        borderRadius: '25px',
        display: 'flex',
        alignItems: 'center',
        padding: '7px 18px',
      }}
      onClick={() => navigate(-1)}
    >
      <ArrowBackIosIcon
        sx={{ fontSize: '17px', width: '17px', height: '17px', margin: 'auto' }}
      />
      <Typography
        variant="body2"
        component="span"
        fontWeight="fontWeightBold"
        color="textPrimary"
        sx={{ textTransform: 'capitalize' }}
      >
        Back
      </Typography>
    </Button>
  );
}
