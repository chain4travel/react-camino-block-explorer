import { mdiTransfer } from '@mdi/js'
import { Box, Grid, Paper, Typography } from '@mui/material'
import BackButton from 'app/components/BackButton'
import CopyTitleCard from 'app/components/CopyTitleCard'
import PageContainer from 'app/components/PageContainer'
import axios from 'axios'
import moment from 'moment'
import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { selectMagellanAddress } from 'store/app-config'
import { useAppSelector } from 'store/configureStore'
import { XPTransactionDetail } from 'types/magellan-types'
import { XPTransaction } from 'types/transaction'
import { currentDateFormat } from 'utils/helpers/moment'
import { convertMemo, getInputFunds, getOutputFunds } from 'utils/magellan'
import { transactionApi } from 'utils/magellan-api-utils'
import { RoutesConfig } from 'utils/route-paths'
import { getAddressFromUrl, getChainTypeFromUrl } from 'utils/route-utils'
import TransactionDetailView from './XPTransactionDetailView'

export default function XPTransactionDetails() {
    const routesConfig = RoutesConfig()
    const [result, setResult] = React.useState<XPTransaction>()
    const [details, setDetails] = React.useState<XPTransactionDetail>()
    const location = useLocation()
    const magellanAddress = useAppSelector(selectMagellanAddress)

    async function fetchTransactionDetail(): Promise<void> {
        const res = (await axios.get(`${magellanAddress}${transactionApi}/${getAddressFromUrl()}`))
            .data
        const parsedDate = moment.utc(res.timestamp)
        let form =
            currentDateFormat()[0] === 'd'
                ? 'ddd DD MMM YYYY HH:mm:ss [GMT]Z (z)'
                : 'ddd MMM DD YYYY HH:mm:ss [GMT]Z (z)'
        const formattedDate = parsedDate.format(form)
        let transaction: XPTransaction = {
            id: res.id,
            // status: 'accepted', //TODO: set dynamically when magellan delivers this information
            type: res.type,
            timestamp: new Date(Date.parse(res.timestamp)),
            from: getInputFunds(res),
            to: getOutputFunds(res),
            fee: res.txFee,
            inputTotals: res.inputTotals,
            outputTotals: res.outputTotals,
            memo: convertMemo(res.memo),
        }
        setResult(transaction)
        setDetails({
            id: res.id,
            status: 'accepted', //TODO: set dynamically when magellan delivers this information
            type: res.type,
            timestamp: formattedDate,
            fee: res.txFee,
            memo: convertMemo(res.memo),
        })
    }

    React.useEffect(() => {
        fetchTransactionDetail()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    return (
        <PageContainer
            pageTitle={`${location.pathname
                .split('/')[3][0]
                .toLocaleUpperCase()} TransactionDetails`}
            metaContent="chain-overview x-chain"
        >
            <Paper
                variant="outlined"
                square
                sx={{
                    minHeight: '680px',
                    width: 1,
                    backgroundColor: 'card.background',
                    borderRadius: '12px',
                    borderWidth: '1px',
                    borderColor: 'primary.light',
                    borderStyle: 'solid',
                    p: '1rem 1.5rem 1rem 1.5rem',
                }}
            >
                <Grid container direction="column" sx={{ width: 1, gap: '20px' }}>
                    <Grid
                        item
                        container
                        alignItems="center"
                        sx={{
                            gap: '20px',
                        }}
                    >
                        <BackButton
                            backToLink={`${routesConfig.BASE_PATH}/${getChainTypeFromUrl()}`}
                        />
                        <Typography variant="h5" component="h5" fontWeight="fontWeightBold">
                            {`${location.pathname
                                .split('/')[3][0]
                                .toLocaleUpperCase()}-Chain Transaction`}
                        </Typography>
                    </Grid>
                    {details && (
                        <CopyTitleCard label="Transaction" value={details.id} icon={mdiTransfer} />
                    )}
                    <TransactionDetailView
                        inputs={result?.from}
                        outputs={result?.to}
                        detailTr={details}
                    />
                </Grid>
                {details && (
                    <Box sx={{ display: 'flex', width: '100%', paddingTop: '1rem' }}>
                        <BackButton
                            backToLink={`${routesConfig.BASE_PATH}/${getChainTypeFromUrl()}`}
                        />
                    </Box>
                )}
            </Paper>
        </PageContainer>
    )
}
