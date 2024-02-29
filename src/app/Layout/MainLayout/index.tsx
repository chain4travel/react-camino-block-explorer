import { Box, CircularProgress, Container, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { getActiveNetwork, selectAllChains, selectNetworkStatus } from 'store/app-config'
import { useAppDispatch, useAppSelector } from 'store/configureStore'

import { ColorModeContext } from '../../../styles/theme/ThemeProvider'
import Icon from '@mdi/react'
import { NavBar } from 'app/components/NavBar'
import { Outlet } from 'react-router-dom'
import PageContainer from 'app/components/PageContainer'
import { Status } from 'types'
import { getChains } from 'api'
import { mdiAccessPointNetworkOff } from '@mdi/js'
import { selectedTheme } from '../../../store/app-config'

const Content: React.FC = () => {
    const chains = useAppSelector(selectAllChains)
    const status = useAppSelector(selectNetworkStatus)
    if (status === Status.LOADING || status === Status.IDLE)
        return (
            <Container fixed maxWidth="xl">
                <CircularProgress
                    color="secondary"
                    size={75}
                    style={{ margin: 'auto', display: 'block' }}
                />
            </Container>
        )
    else if (status === Status.SUCCEEDED && chains?.length > 0) return <Outlet />
    return (
        <PageContainer pageTitle="Error" metaContent="An error has occurred">
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        maxWidth: '500px',
                        gap: '1rem',
                    }}
                >
                    <Icon path={mdiAccessPointNetworkOff} size={3} color="#94A2B8" />
                    <Typography variant="h4" component="span" fontWeight="fontWeightBold">
                        Something went wrong
                    </Typography>
                    <Typography
                        variant="body1"
                        component="span"
                        sx={{
                            textAlign: 'center',
                            color: theme => (theme.palette.mode === 'dark' ? '#CBD4E2' : '#64748B'),
                        }}
                    >
                        We have encountered an unexpected issue with our current system. For
                        uninterrupted service, switch over to the Camino Network.
                    </Typography>
                </Box>
            </Box>
        </PageContainer>
    )
}

export default function MainLayout() {
    const activeNetwork = useAppSelector(getActiveNetwork)
    const dispatch = useAppDispatch()
    const themeContext = useContext(ColorModeContext)
    useEffect(() => {
        dispatch(getChains())
    }, [activeNetwork]) // eslint-disable-line
    const currentTheme = useAppSelector(selectedTheme)
    useEffect(() => {
        themeContext.toggleColorMode(currentTheme)
    }, [currentTheme]) // eslint-disable-line
    return (
        <>
            <Box sx={{ marginBottom: '20px' }}>
                <NavBar />
            </Box>
            <Content />
        </>
    )
}
