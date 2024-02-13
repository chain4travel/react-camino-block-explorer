import { Fragment, useEffect, useState } from 'react'

import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import InfoIcon from '@mui/icons-material/Info'
import { Grid, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Tooltip from '@mui/material/Tooltip'
import useWidth from 'app/hooks/useWidth'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import { useAppDispatch, useAppSelector } from 'store/configureStore'
import styled from 'styled-components'
import { Status } from 'types'
import { ConsumptionCharts, Emissions, TextProps } from 'types/statistics'
import '../../../../styles/scrollbarModal.css'
import TextBlockchainDatachart from '../../../../utils/statistics/TextBlockchainDatachart'
import DateRange from '../DateRange/DateRange'
import LinearMeter from './LinearMeter'

import React from 'react'
const TooltipContainer = styled.div`
    display: flex;
    padding-top: 2rem;
`
const LinearMeterContainer = styled.div`
    margin-top: -3rem;
`
const DateRangeContainer = styled.div`
    margin-top: 2rem;

    @media only screen and (min-width: 1200px) {
        margin-left: 5rem;
        margin-right: 11rem;
    }
`

const Text = styled('p')<TextProps>`
    margin-left: 3rem;
    margin-right: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    background: ${({ backgroundColor }) => backgroundColor};
    padding: 0.5rem;
`

const BlockchainCharts = ({
    darkMode,
    titleText,
    utilSlice,
    sliceGetter,
    sliceGetterLoader,
    typeStatistic,
    tooltipTitle,
}: ConsumptionCharts) => {
    const theme = useTheme()

    const isDark = theme.palette.mode === 'dark'
    const [openModal, setOpenModal] = React.useState(false)
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>(new Date())
    const [seeTimeAxis, setSeeTimeAxis] = useState<string>('month')
    const [firstLoad, setFirstLoad] = useState<boolean>(true)
    const { isTablet, isSmallMobile, isWidescreen } = useWidth()

    const dispatch = useAppDispatch()

    useEffect(() => {
        let startDateObject = moment(startDate)
        let endDateObject = moment(endDate)
        if (startDate !== undefined && endDate !== undefined) {
            dispatch(
                utilSlice({
                    startDate: `${moment(startDate).format('YYYY-MM-DD')}T00:00:00Z`,
                    endDate: `${moment(endDate).format('YYYY-MM-DD')}T23:59:59Z`,
                    limit: endDateObject.diff(startDateObject, 'days'),
                }),
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate])

    useEffect(() => {
        setStartDate(new Date(moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss')))
        setEndDate(new Date(moment().format('YYYY-MM-DD HH:mm:ss')))
    }, [])

    const dataStatistics: Emissions = useAppSelector(sliceGetter)
    const loader = useAppSelector(sliceGetterLoader)

    return (
        <Fragment>
            {loader === Status.LOADING ? (
                <>
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress color="secondary" />
                    </div>
                </>
            ) : (
                <>
                    <Card style={{ backgroundColor: darkMode ? '#060F24' : 'white' }}>
                        <CardHeader
                            title={
                                <span>
                                    {titleText}
                                    <Tooltip title={tooltipTitle} placement="top">
                                        <IconButton>
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                </span>
                            }
                            action={
                                <TooltipContainer>
                                    <IconButton
                                        color="info"
                                        component="label"
                                        onClick={() => setOpenModal(true)}
                                        style={{
                                            cursor: 'default',
                                            color: 'GrayText',
                                        }}
                                    >
                                        <ArrowOutwardIcon />
                                    </IconButton>
                                </TooltipContainer>
                            }
                        />

                        <CardContent>
                            {dataStatistics !== undefined && dataStatistics !== null ? (
                                <>
                                    <LinearMeter
                                        darkMode={darkMode}
                                        titleText={titleText}
                                        data={dataStatistics}
                                        typeStatistic={typeStatistic}
                                        timeSeeAxis={seeTimeAxis}
                                        firstLoad={firstLoad}
                                    />
                                </>
                            ) : null}
                        </CardContent>
                    </Card>
                </>
            )}

            <Modal
                open={openModal}
                onClose={e => {
                    setOpenModal(false)
                }}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                disableScrollLock={true}
            >
                <Box
                    sx={{
                        backgroundColor: 'transparent',
                        borderRadius: '7px',
                        padding: 0,
                        width: isWidescreen ? '1300px' : '80%',
                    }}
                    style={{
                        maxHeight: isSmallMobile ? 550 : '90%',
                        overflowY: 'auto',
                    }}
                >
                    <Card
                        style={{
                            backgroundColor: darkMode ? '#060F24' : 'white',
                            position: 'relative',
                            width: '100%',
                        }}
                    >
                        <CardHeader
                            title={titleText}
                            action={
                                <IconButton
                                    color="info"
                                    component="label"
                                    onClick={() => setOpenModal(false)}
                                    style={{
                                        cursor: 'default',
                                        color: isDark ? 'white' : 'black',
                                    }}
                                >
                                    <Icon path={mdiClose} size={1} />
                                </IconButton>
                            }
                            style={{
                                marginBottom: '0rem',
                                marginLeft: '0.5rem',
                            }}
                        />
                        <CardContent>
                            <Fragment>
                                <Grid
                                    container
                                    spacing={2}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid item xs={12}>
                                        <Text backgroundColor={isDark ? '#0f172a' : '#F5F6FA'}>
                                            {tooltipTitle}
                                        </Text>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextBlockchainDatachart
                                            Text={Text}
                                            dataStatistics={dataStatistics}
                                            endDate={endDate}
                                            startDate={startDate}
                                            typeStatistic={typeStatistic}
                                            isDescriptionOfHighest={true}
                                            timeSeeAxis={seeTimeAxis}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextBlockchainDatachart
                                            Text={Text}
                                            dataStatistics={dataStatistics}
                                            endDate={endDate}
                                            startDate={startDate}
                                            typeStatistic={typeStatistic}
                                            isDescriptionOfHighest={false}
                                            timeSeeAxis={seeTimeAxis}
                                        />
                                    </Grid>
                                </Grid>
                                <DateRangeContainer>
                                    <DateRange
                                        initialStartDate={startDate}
                                        InitianEndDate={endDate}
                                        setEndDate={setEndDate}
                                        setStartDate={setStartDate}
                                        darkMode={darkMode}
                                        setSeeTimeAxis={setSeeTimeAxis}
                                        disableFuture={false}
                                        seeTimeAxis={seeTimeAxis}
                                        disableCurrentDay={false}
                                        firstLoad={firstLoad}
                                        setFirstLoad={setFirstLoad}
                                    />
                                </DateRangeContainer>
                                <LinearMeterContainer style={{ marginTop: isTablet ? 20 : 0 }}>
                                    <LinearMeter
                                        darkMode={darkMode}
                                        titleText={titleText}
                                        data={dataStatistics}
                                        typeStatistic={typeStatistic}
                                        timeSeeAxis={seeTimeAxis}
                                        firstLoad={firstLoad}
                                    />
                                </LinearMeterContainer>
                            </Fragment>
                        </CardContent>
                    </Card>
                </Box>
            </Modal>
        </Fragment>
    )
}

export default BlockchainCharts
