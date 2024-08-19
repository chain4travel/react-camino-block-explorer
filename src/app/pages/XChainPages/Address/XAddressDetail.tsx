import { Box, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { addressesApi, assetsApi } from 'utils/magellan-api-utils'
import { getAddressFromUrl, getChainTypeFromUrl } from 'utils/route-utils'

import { CamAmount } from 'app/components/CamAmount'
import { ChainType } from 'utils/types/chain-type'
import CopyTitleCard from 'app/components/CopyTitleCard'
import PageContainer from 'app/components/PageContainer'
import { RoutesConfig } from '../../../../utils/route-paths'
import SubPageTitle from 'app/components/SubPageTitle'
import TabPanel from 'app/components/TabComponent/TabPanel'
import TabsHeader from 'app/components/TabComponent/TabsHeader'
import XPAddressView from './XPAddressView'
import axios from 'axios'
import { getBaseUrl, getChainID } from 'api/utils'
import { mdiFileDocumentOutline } from '@mdi/js'
import { useLocation } from 'react-router-dom'

const tabOptions = [
    {
        label: 'Transactions',
        value: 'transactions',
    },
]

async function loadAssets() {
    const loadedAssets = (await axios.get(`${getBaseUrl()}${assetsApi}`)).data
    const newElements = new Map()
    if (loadedAssets.assets) {
        loadedAssets.assets.forEach((element: AddressBalance) => {
            newElements.set(element.id, {
                name: element.name,
                symbol: element.symbol,
            })
        })
    }
    return newElements
}
export interface AddressBalance {
    id: string
    balance: number
    symbol: string
    name: string
}

export default function XAddressDetail() {
    const routesConfig = RoutesConfig()
    // getting the address from the url by getting what comes after the last slash
    const address = getAddressFromUrl()
    const chainType = getChainTypeFromUrl() as ChainType
    const [value, setValue] = React.useState(0)
    const [balance, setBalance] = useState(0)
    // const dispatch = useAppDispatch();
    const location = useLocation()
    async function loadBalances(address: string | undefined) {
        const assets = await loadAssets()
        const addressInfo = await (
            await axios.get(
                `${getBaseUrl()}${addressesApi}/${address}?chainID=${getChainID(
                    getAddressFromUrl()[0].toLowerCase(),
                )}`,
            )
        ).data
        const addressBalances: AddressBalance[] = []
        if (addressInfo && addressInfo.assets) {
            Object.entries(addressInfo.assets).forEach(([key, value]: [key: any, value: any]) => {
                addressBalances.push({
                    id: key,
                    balance: value.balance,
                    name: assets.get(key)?.name || 'UNKNOWN',
                    symbol: assets.get(key)?.symbol || 'UNKNOWN',
                })
            })

            let totalBalance = 0
            addressBalances.forEach((element: AddressBalance) => {
                totalBalance += +element.balance
            })

            setBalance(totalBalance)

            return addressBalances
        }
        return []
    }
    useEffect(() => {
        loadBalances(getAddressFromUrl())
    }, [location])
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }
    const getChainPageTitle = (chainType: ChainType) => {
        switch (chainType) {
            case ChainType.X_CHAIN:
                return 'X chain'
            case ChainType.P_CHAIN:
                return 'P chain'
            default:
                return 'X chain'
        }
    }
    return (
        <PageContainer
            pageTitle={getChainPageTitle(chainType)}
            metaContent={`chain-overview ${chainType}`}
        >
            <SubPageTitle
                title="Address Detail"
                backToLink={routesConfig.BASE_PATH + '/' + chainType}
            />
            <CopyTitleCard
                label="Address"
                value={address}
                icon={mdiFileDocumentOutline}
                mixedStyle
            />
            <AddressOverviewCard balance={balance} />
            <Paper square variant="outlined" sx={{ backgroundColor: 'card.background' }}>
                <TabsHeader tabValue={value} changeAction={handleChange} tabOptions={tabOptions}>
                    <Panels value={value} chainType={getChainTypeFromUrl() as ChainType} />
                </TabsHeader>
            </Paper>
        </PageContainer>
    )
}

const Panels = ({ value, chainType }: { value: number; chainType: ChainType }) => {
    return (
        <>
            <TabPanel value={value} index={0}>
                <XPAddressView chainType={chainType} />
            </TabPanel>
            <TabPanel value={value} index={1}></TabPanel>
        </>
    )
}

export const AddressOverviewCard = ({ balance }: { balance: number }) => {
    return (
        <Paper variant="outlined" sx={{ backgroundColor: 'card.background' }}>
            <Box p={2}>
                <Grid container spacing={2}>
                    <Grid item xs md={6}>
                        <Typography
                            variant="body1"
                            component="h6"
                            fontWeight="fontWeightBold"
                            gutterBottom={true}
                        >
                            Balance
                        </Typography>
                    </Grid>
                    <Grid item md={6}>
                        <CamAmount amount={balance} currency="nCam" />
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}