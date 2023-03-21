import React, { useEffect, Fragment, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store/configureStore'
import { typesMeter } from '../../../../utils/statistics/ChartSelector'
import BarMeter from './BarMeter'
import TimeSeriesMeter from './TimeSeriesMeter'
import { Status } from 'types'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import useWidth from 'app/hooks/useWidth'
import DateRange from '../DateRange/DateRange'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import moment from 'moment'
import CountriesBarMeter from './CountriesBarMeter'
import '../../../../styles/custompicker.css'
import styled from 'styled-components'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'
import { useTheme } from '@mui/material'
import '../../../../styles/scrollbarModal.css'
import { ConsumptionCharts, Emissions } from 'types/statistics'

type DatesChart = {
    starterDate: Date
    endingDate: Date
}

const TooltipContainer = styled.div`
    display: flex;
    padding-top: 2rem;
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
                    <Card style={{ backgroundColor: darkMode ? '#060F24' : 'white' }}>
                        <CardHeader
                            title={titleText}
                            style={{
                                marginBottom: '0rem',
                                marginLeft: '0.5rem',
                            }}
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
