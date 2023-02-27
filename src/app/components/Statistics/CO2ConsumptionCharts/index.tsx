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
}) => {
    const theme = useTheme()
    const isDark = theme.palette.mode === 'dark'

    const { isWidescreen } = useWidth()

    const [openModal, setOpenModal] = useState(false)
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [seeTimeAxis, setSeeTimeAxis] = useState<String>('month')

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (startDate !== undefined && endDate !== undefined) {
            dispatch(
                utilSlice({
                    startDate: moment(startDate).toISOString(true).replace('.000-05:00', 'Z'),
                    endDate: moment(endDate).toISOString(true).replace('.000-05:00', 'Z'),
                }),
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate])

    useEffect(() => {
        setStartDate(new Date(moment().startOf('month').format('YYYY-MM-DD HH:mm:ss')))
        setEndDate(new Date(moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')))
    }, [])

    const meterCO2: any = useAppSelector(sliceGetter)

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
                                padding: '1.5rem',
                                minWidth: isWidescreen ? '1300px' : '0px',
                            }}
                            style={{
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
