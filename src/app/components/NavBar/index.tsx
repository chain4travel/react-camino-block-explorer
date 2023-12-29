import * as React from 'react'

import { AppBar, Box, Container, Toolbar, useTheme } from '@mui/material'

import Links from './Links'
import SearchInput from './SearchInput'
import useWidth from 'app/hooks/useWidth'

export function NavBar() {
    const theme = useTheme()
    const { isDesktop } = useWidth()

    return (
        <>
            <AppBar
                sx={{
                    borderBottom: '1px solid',
                    borderColor: 'card.border',
                    backgroundColor: 'card.navBar',
                    borderRadius: '0px',
                    backgroundImage: 'none',
                    boxShadow: 'none',
                    px: '1.5rem',
                    top: '65px',
                    zIndex: 9,
                    [theme.breakpoints.up('md')]: { top: '69px' },
                }}
                position="fixed"
            >
                <Container
                    maxWidth="xl"
                    sx={{
                        width: '100%',
                        paddingLeft: '0px !important',
                        paddingRight: '0px !important',
                        marginBottom: '0px',
                        marginTop: '0px',
                        gap: '0px',
                        '@media (max-width: 899px)': {
                            marginTop: '0px',
                        },
                    }}
                >
                    <Toolbar
                        sx={{
                            display: 'flex',
                            height: 'auto',
                            py: '1rem',
                            px: '0rem !important',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '1rem',
                            minHeight: 'auto',
                            [theme.breakpoints.down('md')]: { py: '.5rem' },
                        }}
                    >
                        <Links />
                        <Box sx={{ display: 'flex', ml: !isDesktop ? 'auto' : '0' }}>
                            <SearchInput />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <AppBar
                position="relative"
                sx={{
                    [theme.breakpoints.up('md')]: { minHeight: '81px' },
                    minHeight: '65px',
                    boxShadow: 'none',
                }}
            />
        </>
    )
}
