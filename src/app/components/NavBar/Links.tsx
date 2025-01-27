import React, { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { RoutesConfig } from 'utils/route-paths'
import { ChainType } from 'utils/types/chain-type'
import { STATISTICS_LINK } from '../../../utils/types/statistics-type'

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}
const activeTab = (path: string): number => {
    switch (path) {
        case ChainType.C_CHAIN:
            return 0
        case ChainType.X_CHAIN:
            return 1
        case ChainType.P_CHAIN:
            return 2
        case STATISTICS_LINK:
            return 5
    }
    return 0
}

export default function Links() {
    const routes = RoutesConfig()
    const location = useLocation()
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if (location.pathname !== routes.MAINNET) {
            if (newValue === 0) navigate(routes.CCHAIN)
            else if (newValue === 1) navigate(routes.XCHAIN)
            else if (newValue === 2) navigate(routes.PCHAIN)
            else if (newValue === 5) navigate(routes.STATISTICS)
        }
    }

    const activeChainTab = useMemo(() => {
        let activeChain = location.pathname.split('/')[3]
        return activeTab(activeChain)
    }, [location])

    let navigate = useNavigate()
    return (
        <Box
            sx={{
                display: 'flex',
                cursor: 'pointer',
                width: '100%',
                height: '48px',
            }}
        >
            <Tabs
                value={activeChainTab}
                onChange={handleChange}
                textColor="secondary"
                // remove the underline
                sx={{ '& .MuiTabs-indicator': { display: 'none' } }}
                scrollButtons="auto"
                variant="scrollable"
                allowScrollButtonsMobile
            >
                <Tab
                    className="tab"
                    disableRipple
                    label="C-Chain"
                    {...a11yProps(0)}
                    sx={{ alignItems: { xs: 'baseline', sm: 'self-start' } }}
                />
                <Tab
                    className="tab"
                    disableRipple
                    label="X-Chain"
                    {...a11yProps(1)}
                    sx={{ alignItems: { xs: 'baseline', sm: 'self-start' } }}
                />
                <Tab
                    className="tab"
                    disableRipple
                    label="P-Chain"
                    {...a11yProps(2)}
                    sx={{ alignItems: { xs: 'baseline', sm: 'self-start' } }}
                />
                <Tab
                    className="tab"
                    value={5}
                    disableRipple
                    label="Statistics"
                    {...a11yProps(5)}
                    sx={{ alignItems: { xs: 'baseline', sm: 'self-start' } }}
                />
            </Tabs>
        </Box>
    )
}
