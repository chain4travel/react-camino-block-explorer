import React, { FC } from 'react'
import { Grid } from '@mui/material'
import { Status } from 'types'
import { customToLocaleString } from 'utils/currency-utils'
import { getOverviewValueForGewi } from 'utils/overview-utils'
import OverviewCard from './OverviewCard'
import { useNavigate } from 'react-router-dom'
import { RoutesConfig } from 'utils/route-paths'

interface OverviewCardsProps {
    numberOfTransactions: number
    totalGasFees: number
    numberOfActiveValidators: number
    numberOfValidators: number
    percentageOfActiveValidators: number
    gasFeesLoading: Status
    transactionsLoading: Status
    validatorsLoading: Status
}

const OverviewCards: FC<OverviewCardsProps> = ({
    numberOfTransactions,
    totalGasFees,
    numberOfActiveValidators,
    numberOfValidators,
    percentageOfActiveValidators,
    gasFeesLoading,
    transactionsLoading,
    validatorsLoading,
}) => {
    const navigate = useNavigate()
    const routesConfig = RoutesConfig()

    return (
        <Grid container rowSpacing={{ xs: 4, lg: '0!important' }} columnSpacing={{ xs: 0, lg: 4 }}>
            <Grid item xs={12} lg={4}>
                <OverviewCard
                    title="Number Of Validators"
                    value={customToLocaleString(numberOfValidators, 0)}
                    loading={validatorsLoading}
                    subValue={`(${numberOfActiveValidators} / ${percentageOfActiveValidators}% active)`}
                    dataCy="activeValidators"
                    onClick={() => navigate(routesConfig.VALIDATORS)}
                />
            </Grid>
            <Grid item xs={12} lg={4}>
                <OverviewCard
                    title="Number of Transactions"
                    value={customToLocaleString(numberOfTransactions, 2)}
                    loading={transactionsLoading}
                />
            </Grid>
            <Grid item xs={12} lg={4}>
                <OverviewCard
                    title="Total Gas Fees"
                    value={getOverviewValueForGewi(totalGasFees)}
                    loading={gasFeesLoading}
                />
            </Grid>
        </Grid>
    )
}

export default OverviewCards
