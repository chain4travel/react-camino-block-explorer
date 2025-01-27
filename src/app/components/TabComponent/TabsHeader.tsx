import React from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { ITabsHeader } from 'types/tabsHeader'

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

export default function TabsHeader({ tabValue, changeAction, children, tabOptions }: ITabsHeader) {
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabValue}
                    onChange={changeAction}
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    {tabOptions.map(
                        (
                            option: {
                                label: string
                            },
                            index: number,
                        ) => (
                            <Tab
                                key={index}
                                label={option.label}
                                {...a11yProps(index)}
                                sx={{ paddingLeft: '10px', paddingRight: '10px' }}
                            />
                        ),
                    )}
                </Tabs>
            </Box>
            <>{children}</>
        </Box>
    )
}
