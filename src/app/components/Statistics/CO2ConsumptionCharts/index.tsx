import '../../../../styles/custompicker.css'
import '../../../../styles/scrollbarModal.css'

import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    IconButton,
    Modal,
    Tooltip,
    Typography,
} from '@mui/material'
import { ConsumptionCharts, Emissions } from 'types/statistics'
import { Grid, useTheme } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { mdiArrowExpand, mdiClose, mdiInformationOutline } from '@mdi/js'
import { useAppDispatch, useAppSelector } from 'store/configureStore'

import BarMeter from './BarMeter'
import CountriesBarMeter from './CountriesBarMeter'
import DateRange from '../DateRange/DateRange'
import Icon from '@mdi/react'
import { Status } from 'types'
import TimeSeriesMeter from './TimeSeriesMeter'
import moment from 'moment'
import styled from 'styled-components'
import { typesMeter } from '../../../../utils/statistics/ChartSelector'
import useWidth from 'app/hooks/useWidth'

type DatesChart = {
    starterDate: Date
    endingDate: Date
}

const TooltipContainer = styled.div`
    display: flex;
`
const DateRangeContainer = styled.div`
    margin-top: 2rem;

    @media only screen and (min-width: 1200px) {
        margin-left: 5rem;
        margin-right: 11rem;
    }
`

const CO2ConsumptionCharts = ({
    utilSlice,
    typeMeter,
    darkMode,
    sliceGetter,
    sliceGetterLoader,
    titleText,
    description,
}: ConsumptionCharts) => {
    const theme = useTheme()
    const isDark = theme.palette.mode === 'dark'

    const { isSmallMobile, isWidescreen } = useWidth()

    const [openModal, setOpenModal] = useState(false)
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>(new Date())
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [seeTimeAxis, setSeeTimeAxis] = useState<string>('month')
    const [firstLoad, setFirstLoad] = useState(false)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (startDate !== undefined && endDate !== undefined) {
            CO2EmissionsDate()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate])

    useEffect(() => {
        defaultDatesCO2Emissions()
    }, [])

    const meterCO2: Emissions = useAppSelector(sliceGetter)
    const loader = useAppSelector(sliceGetterLoader)

    useEffect(() => {
        if (firstLoad === false && meterCO2 !== null && meterCO2 !== undefined) {
            setFirstLoad(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [meterCO2])

    function defaultDatesCO2Emissions() {
        let todayDay = new Date().getDate()

        //First 5 days of Month
        if (todayDay <= 5) {
            setStartDate(
                new Date(
                    moment()
                        .add(-7, 'days')
                        .startOf('month')
                        .startOf('day')
                        .format('YYYY-MM-DD HH:mm:ss'),
                ),
            )
            setEndDate(
                new Date(
                    moment()
                        .add(-7, 'days')
                        .endOf('month')
                        .endOf('day')
                        .format('YYYY-MM-DD HH:mm:ss'),
                ),
            )
        } else {
            setStartDate(
                new Date(moment().startOf('month').startOf('day').format('YYYY-MM-DD HH:mm:ss')),
            )
            setEndDate(
                new Date(moment().add(-1, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss')),
            )
        }
    }

    function CO2EmissionsDate(): DatesChart {
        let datesChart: DatesChart = {
            // @ts-ignore
            starterDate: startDate,
            // @ts-ignore
            endingDate: endDate,
        }

        let diffDays = moment(datesChart.endingDate).diff(moment(datesChart.starterDate), 'days')

        if (diffDays <= 0) {
            let newStarterDate = moment(datesChart.endingDate).add(-1, 'days').toDate()
            setStartDate(newStarterDate)
        } else {
            dispatch(
                utilSlice({
                    startDate: `${moment(startDate).format('YYYY-MM-DD')}T00:00:00Z`,
                    endDate: `${moment(endDate).format('YYYY-MM-DD')}T23:59:59Z`,
                }),
            )
        }

        return datesChart
    }

    return (
        <Fragment>
            {loader === Status.LOADING && firstLoad === false ? (
                <>
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress color="secondary" />
                    </div>
                </>
            ) : (
                <>
                    <Card
                        sx={{
                            backgroundColor: 'card.background',
                            boxShadow: 0,
                            backgroundImage: 'none',
                            borderRadius: '12px',
                            borderWidth: '1px',
                            borderColor: 'primary.light',
                            borderStyle: 'solid',
                        }}
                    >
                        <CardHeader
                            title={
                                <Typography
                                    variant="h5"
                                    component="span"
                                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                                >
                                    {titleText}
                                    <Tooltip title={description} placement="top">
                                        <Icon path={mdiInformationOutline} size={1} />
                                    </Tooltip>
                                </Typography>
                            }
                            action={
                                <TooltipContainer>
                                    <IconButton
                                        color="info"
                                        component="label"
                                        onClick={() => setOpenModal(true)}
                                        sx={{
                                            color: `var(--camino-too-blue-to-be-true)`,
                                            padding: '0.5rem',
                                            border: '1px solid var(--camino-too-blue-to-be-true)',
                                        }}
                                    >
                                        <Icon path={mdiArrowExpand} size={0.7} />
                                    </IconButton>
                                </TooltipContainer>
                            }
                            sx={{ '& .MuiCardHeader-action': { alignSelf: 'center' } }}
                        />
                        <CardContent>
                            {firstLoad === true && (
                                <>
                                    {typeMeter === typesMeter.BAR && (
                                        <BarMeter darkMode={darkMode} dataSeries={meterCO2.value} />
                                    )}
                                    {typeMeter === typesMeter.TIME_SERIES && (
                                        <TimeSeriesMeter
                                            darkMode={darkMode}
                                            dataSeries={meterCO2.value}
                                            titleText={titleText}
                                            seeTimeAxis={seeTimeAxis}
                                        />
                                    )}
                                    {typeMeter === typesMeter.COUNTRIES_BAR && (
                                        <CountriesBarMeter
                                            darkMode={darkMode}
                                            dataSeries={meterCO2.value}
                                            titleText={titleText}
                                        />
                                    )}
                                </>
                            )}
                        </CardContent>
                    </Card>
                </>
            )}

            {openModal === true && (
                <>
                    <Modal
                        open={openModal}
                        onClose={e => {
                            setOpenModal(false)
                        }}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '& .MuiPaper-root': { backgroundImage: 'none' },
                        }}
                        disableScrollLock={true}
                    >
                        <Box
                            sx={{
                                backgroundColor: 'transparent',
                                borderRadius: '7px',
                                padding: 0,
                                minWidth: isWidescreen ? '1300px' : '0px',
                            }}
                            style={{
                                maxHeight: isSmallMobile ? 550 : '90%',
                                overflowY: 'auto',
                            }}
                        >
                            <Card style={{ backgroundColor: darkMode ? '#060F24' : 'white' }}>
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
                                />
                                <CardContent>
                                    <Grid
                                        container
                                        spacing={2}
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="body1"
                                                component="p"
                                                sx={{
                                                    my: 2,
                                                    mx: 1,
                                                    border: 1,
                                                    borderColor: 'primary.light',
                                                    borderRadius: 1,
                                                    backgroundColor: 'card.background',
                                                    p: 2,
                                                }}
                                            >
                                                {description}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    {meterCO2 != null && meterCO2 !== undefined && (
                                        <DateRangeContainer>
                                            <DateRange
                                                initialStartDate={startDate}
                                                InitianEndDate={endDate}
                                                setEndDate={setEndDate}
                                                setStartDate={setStartDate}
                                                darkMode={darkMode}
                                                setSeeTimeAxis={setSeeTimeAxis}
                                                disableFuture={true}
                                                seeTimeAxis={seeTimeAxis}
                                                disableCurrentDay={true}
                                            />

                                            {typeMeter === typesMeter.BAR && (
                                                <BarMeter
                                                    darkMode={darkMode}
                                                    dataSeries={meterCO2.value}
                                                />
                                            )}
                                            {typeMeter === typesMeter.TIME_SERIES && (
                                                <TimeSeriesMeter
                                                    darkMode={darkMode}
                                                    dataSeries={meterCO2.value}
                                                    titleText={titleText}
                                                    seeTimeAxis={seeTimeAxis}
                                                />
                                            )}
                                            {typeMeter === typesMeter.COUNTRIES_BAR && (
                                                <CountriesBarMeter
                                                    darkMode={darkMode}
                                                    dataSeries={meterCO2.value}
                                                    titleText={titleText}
                                                />
                                            )}
                                        </DateRangeContainer>
                                    )}
                                </CardContent>
                            </Card>
                        </Box>
                    </Modal>
                </>
            )}
        </Fragment>
    )
}

export default CO2ConsumptionCharts
