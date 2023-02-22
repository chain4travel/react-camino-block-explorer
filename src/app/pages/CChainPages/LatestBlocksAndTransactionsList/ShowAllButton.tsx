import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import MainButton from '../../../components/MainButton'

const ShowAllButton = ({ toLink }: { toLink: string }) => {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 'auto',
            }}
        >
            <Link style={{ textDecoration: 'none' }} to={toLink} rel="noopener noreferrer">
                <MainButton variant="outlined">
                    <Typography
                        variant="body2"
                        component="span"
                        fontWeight="fontWeightBold"
                        sx={{ color: 'primary.contrastText' }}
                    >
                        Show All
                    </Typography>
                </MainButton>
            </Link>
        </Box>
    )
}

export default ShowAllButton
